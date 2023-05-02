import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentRef } from './document-ref.service';
import { WindowRef } from './window-ref.service';

export interface ISignaturePadOptions {
    dotSize: number | (() => number);
    minWidth: number;
    maxWidth: number;
    canvasHeight: number;
    canvasWidth: number;
    backgroundColor: string;
    penColor: string;
    velocityFilterWeight: number;
    fontSize: number;
    fontFamily: string;
}

class Point {
    public constructor(public x: number, public y: number, public time?: number) {
        this.time = time || new Date().getTime();
    }

    public velocityFrom(start: Point): number {
        return (this.time !== start.time) ? this.distanceTo(start) / (this.time - start.time) : 1;
    }

    public distanceTo(start: Point): number {
        return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
    }
}

class Bezier {
    public constructor(public startPoint: Point, public control1: Point, public control2: Point, public endPoint: Point) {
    }

    // Returns approximated length.
    public length(): number {
        const steps = 10;
        let length = 0;
        let t: number;
        let cx: number;
        let cy: number;
        let px: number;
        let py: number;
        let xdiff: number;
        let ydiff: number;

        for (let i = 0; i <= steps; i++) {
            t = i / steps;
            cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
            cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
            if (i > 0) {
                xdiff = cx - px;
                ydiff = cy - py;
                length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
            }
            px = cx;
            py = cy;
        }

        return length;
    }

    private point(t: number, start: number, c1: number, c2: number, end: number) {
        return start * (1.0 - t) * (1.0 - t) * (1.0 - t)
            + 3.0 * c1 * (1.0 - t) * (1.0 - t) * t
            + 3.0 * c2 * (1.0 - t) * t * t
            + end * t * t * t;
    }
}

@Component({
    selector: 'app-signature-pad',
    templateUrl: './signature-pad.component.html',
    styleUrls: ['./signature-pad.component.scss']
})
export class ArxSignaturePadComponent implements OnInit, AfterViewInit, ISignaturePadOptions, OnChanges {
    public modes = { sign: 'sign', type: 'type' };
    @Input() public signItText: string;
    @Input() public typeItText: string;
    @Input() public typeItPreviewText: string;
    @Input() public signItPreviewText: string;
    @Input() public clearText: string;
    @Input() public signItInstruction: string;
    @Input() public showSignTypeSelect: boolean;

    @Input() public currentMode: string = this.modes.type;
    @Input() public dotSize: number | number | (() => number);
    @Input() public minWidth: number;
    @Input() public maxWidth: number;
    @Input() public canvasHeight: number;
    @Input() public canvasWidth: number;
    @Input() public backgroundColor: string;
    @Input() public penColor: string;
    @Input() public velocityFilterWeight: number;
    @Input() public fontSize: number;
    @Input() public fontFamily: string;
    @Input() public readOnly: boolean;
    @Input() public name: string; // written text full name
    @Output() public onSignEnd = new EventEmitter(); // tslint:disable-line
    @Output() public onSignBegin = new EventEmitter(); // tslint:disable-line
    @Output() public onTextKeyup: EventEmitter<any> = new EventEmitter<any>(); // tslint:disable-line
    @Output() public onClear: EventEmitter<any> = new EventEmitter<any>(); // tslint:disable-line
    public isEmpty = true;
    public selectionFormGroup: FormGroup;

    @ViewChild('typeItInputRef') private typeItInputRef: ElementRef;
    @ViewChild('helperDivRef', { static: true }) private helperDivRef: ElementRef;
    @ViewChild('canvasRef', { static: true }) private canvasRef: ElementRef;
    private canvasElement: any;
    private context: any;
    private points: Point[];
    private lastVelocity: number;
    private lastWidth: number;

    private mouseButtonDown = false;
    private initialFontSize: number;
    private listeningToEvents: boolean;
    // Mouse handlers implemented in ngAfterViewInit
    private handleMouseDown: ((event: any) => void);
    private handleMouseMove: ((event: any) => void);
    private handleMouseUp: ((event: any) => void);
    private handleTouchStart: ((event: any) => void);
    private handleTouchMove: ((event: any) => void);
    private handleTouchEnd: ((event: any) => void);

    private static getDefaultOptions(): ISignaturePadOptions {
        const dotSizeFn = () => (0.5 + 2.5) / 2;

        return {
            velocityFilterWeight: 0.7,
            minWidth: 0.5,
            maxWidth: 2.5,
            canvasWidth: 650,
            canvasHeight: 175,
            dotSize: dotSizeFn,
            penColor: '#000000',
            backgroundColor: 'rgba(255,255,255,0)',
            fontSize: 72,
            fontFamily: 'PhontPhreak-Handwriting'
        } as ISignaturePadOptions;
    }

    constructor(
        private windowRef: WindowRef,
        private documentRef: DocumentRef,
        private formBuilder: FormBuilder
        ) {}

    public ngOnChanges(changes: SimpleChanges) {

      if (changes.name && changes.name.currentValue !== undefined && changes.name.currentValue !== null && this.currentMode === this.modes.type) {
          this.applySig(changes.name.currentValue);
      }
    }

    public ngOnInit(): void {
        Object.assign(this as ISignaturePadOptions, ArxSignaturePadComponent.getDefaultOptions());
        this.initialFontSize = this.fontSize;

        // TODO: how should this component handle form elements?
        this.selectionFormGroup = this.formBuilder.group({});
        const typeOrSignControlName = 'typeOrSign';
        this.selectionFormGroup.addControl(
            typeOrSignControlName, this.formBuilder.control({ disabled: false, value: this.modes.type }, null));
        const typeOrSignControl = this.selectionFormGroup.get(typeOrSignControlName);
        typeOrSignControl.valueChanges.forEach((mode: string) => {
            this.changeMode(mode);
        });
    }

    public ngAfterViewInit(): void {
        this.canvasElement = this.canvasRef.nativeElement;
        this.context = this.canvasElement.getContext('2d');
        this.resizeCanvas();

        // we need add these inline so they are available to unbind while still having
        //  access to 'self' we could use _.bind but it's not worth adding a dependency
        const self = this;
        this.handleMouseDown = (event: any): void => {
            if (event.which === 1) {
                self.mouseButtonDown = true;
                self.strokeBegin(event);
            }
        };

        this.handleMouseMove = (event: any): void => {
            if (self.mouseButtonDown) {
                self.strokeUpdate(event);
            }
        };

        this.handleMouseUp = (event: any): void => {
            if (event.which === 1 && self.mouseButtonDown) {
                self.mouseButtonDown = false;
                self.strokeEnd(event);
            }
        };

        this.handleTouchStart = (event: any): void => {
            if (event.targetTouches.length === 1) {
                const touch = event.changedTouches[0];
                self.strokeBegin(touch);
            }
        };

        this.handleTouchMove = (event: any): void => {
            // Prevent scrolling.
            event.preventDefault();

            const touch = event.targetTouches[0];
            self.strokeUpdate(touch);
        };

        this.handleTouchEnd = (event: any): void => {
            const wasCanvasTouched = event.target === self.canvasElement;
            if (wasCanvasTouched) {
                event.preventDefault();
                self.strokeEnd(event);
            }
        };

        if (this.currentMode === this.modes.sign) {
            this.on();
        }
    }

    public changeMode(mode: string): void {
        // no change.
        if (this.currentMode === mode || this.readOnly) {
            return;
        }

        this.currentMode = mode;

        if (this.currentMode === this.modes.sign) {
            this.on();
            this.clear();
        } else if (this.currentMode === this.modes.type) {
            this.applySig(this.name);

            this.helperDivRef.nativeElement.style.fontSize = `${this.fontSize}px`;
            this.fontSize = this.initialFontSize;

            this.off();
        }
    }

    public applySig(text: string): void {
        const div = this.helperDivRef.nativeElement;
        const canvas = this.canvasElement;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        div.style.width = canvas.width + 'px';

        // TODO: Improve the sanitization of text here.
        let typed = text.replace(/>/g, '&gt;').replace(/</g, '&lt;');

        this.lastWidth = canvas.width;

        if (typed.length < 100 && typed.length !== 0) {
            typed = typed.replace(/^\s+|\s+$/g, '');
            div.style.fontSize = `${this.fontSize}px`;
            div.innerHTML = typed;

            if (div.scrollWidth > div.offsetWidth) {
                while (div.scrollWidth > div.offsetWidth && this.fontSize > 8) {
                    this.fontSize--;
                    div.style.fontSize = `${this.fontSize}px`;
                }
            } else if (div.scrollWidth < div.offsetWidth) {
                while (div.scrollWidth < div.offsetWidth && this.fontSize < this.initialFontSize) {
                    this.fontSize++;
                    div.style.fontSize = `${this.fontSize}px`;
                }
            }

            this.clear();
            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            ctx.fillText(typed, 30, 100);
            this.isEmpty = false;
        } else if (typed.length === 0) {
            // clear canvas and div
            this.clear();
            div.innerHTML = '';
            this.fontSize = this.initialFontSize;
            div.style.fontSize = `${this.fontSize}px`;
            this.isEmpty = true;
        }

        this.onTextKeyup.emit(typed);
    }

    public clear(): void {
        const ctx = this.context;
        const canvas = this.canvasElement;

        ctx.fillStyle = this.backgroundColor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.reset();
        this.onClear.emit();
    }

    public toDataURL(imageType?: any, quality?: any): string {
        const canvas = this.canvasElement;
        return canvas.toDataURL.apply(canvas, arguments);
    }

    public fromDataURL(dataUrl: string): void {
        const image = new Image();
        const ratio = this.windowRef.nativeWindow.devicePixelRatio || 1;
        const width = this.canvasElement.width / ratio;
        const height = this.canvasElement.height / ratio;

        this.reset();
        image.src = dataUrl;
        image.onload = () => this.context.drawImage(image, 0, 0, width, height);
        this.isEmpty = false;
    }

    public on(): void {
        if (this.listeningToEvents) { return; }
        this.listeningToEvents = true;

        this.handleMouseEvents();
        this.handleTouchEvents();
    }

    public off(): void {
        if (!this.listeningToEvents) { return; }
        this.listeningToEvents = false;

        this.canvasElement.removeEventListener('mousedown', this.handleMouseDown);
        this.canvasElement.removeEventListener('mousemove', this.handleMouseMove);
        this.documentRef.nativeDocument.removeEventListener('mouseup', this.handleMouseUp);
        this.canvasElement.removeEventListener('touchstart', this.handleTouchStart);
        this.canvasElement.removeEventListener('touchmove', this.handleTouchMove);
        this.canvasElement.removeEventListener('touchend', this.handleTouchEnd);
    }

    private strokeUpdate(event: any): void {
        const point = this.createPoint(event);
        this.addPoint(point);
    }

    private strokeBegin(event: any): void {
        this.reset();
        this.strokeUpdate(event);
        this.onSignBegin.emit();
    }

    private strokeDraw(point: Point): void {
        const dotSize = typeof (this.dotSize) === 'function' ? this.dotSize() : this.dotSize;
        const ctx = this.context;

        ctx.beginPath();
        this.drawPoint(point.x, point.y, dotSize);
        ctx.closePath();
        ctx.fill();
    }

    private strokeEnd(event: any): void {
        const canDrawCurve = this.points.length > 2;
        const point = this.points[0];

        if (!canDrawCurve && point) {
            this.strokeDraw(point);
        }

        this.onSignEnd.emit();
    }

    private handleMouseEvents(): void {
        this.mouseButtonDown = false;

        this.canvasElement.addEventListener('mousedown', this.handleMouseDown);
        this.canvasElement.addEventListener('mousemove', this.handleMouseMove);
        this.documentRef.nativeDocument.addEventListener('mouseup', this.handleMouseUp);
    }

    private handleTouchEvents(): void {
        // Pass touch events to canvas element on mobile IE11 and Edge.
        this.canvasElement.style.msTouchAction = 'none';
        this.canvasElement.style.touchAction = 'none';
        this.canvasElement.addEventListener('touchstart', this.handleTouchStart);
        this.canvasElement.addEventListener('touchmove', this.handleTouchMove);
        this.canvasElement.addEventListener('touchend', this.handleTouchEnd);
    }

    //TODO: Look more into what we need to do and why this was put in for window resize
    public resizeCanvas(): void {
        const window = this.windowRef.nativeWindow;
        const canvas = this.canvasElement;
        const context = this.context;
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        const ratio: number = Math.max(window.devicePixelRatio || 1, 1);
        context.scale(ratio, ratio);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        this.clear();
    }

    private reset(): void {
        this.points = [];
        this.lastVelocity = 0;
        this.lastWidth = (this.minWidth + this.maxWidth) / 2;
        this.isEmpty = true;
        this.context.fillStyle = this.penColor;
    }

    private createPoint(event: any): Point {
        const rect = this.canvasElement.getBoundingClientRect();
        return new Point(
            event.clientX - rect.left,
            event.clientY - rect.top
        );
    }

    private addPoint(point: Point): void {
        const points = this.points;
        let c2: any;
        let c3: any;
        let curve: Bezier;
        let tmp: any;

        points.push(point);

        if (points.length > 2) {
            // To reduce the initial lag make it work with 3 points
            // by copying the first point to the beginning.
            if (points.length === 3) { points.unshift(points[0]); }

            tmp = this.calculateCurveControlPoints(points[0], points[1], points[2]);
            c2 = tmp.c2;
            tmp = this.calculateCurveControlPoints(points[1], points[2], points[3]);
            c3 = tmp.c1;
            curve = new Bezier(points[1], c2, c3, points[2]);
            this.addCurve(curve);

            // Remove the first element from the list,
            // so that we always have no more than 4 points in points array.
            points.shift();
        }
    }

    private calculateCurveControlPoints(
        s1: Point,
        s2: Point,
        s3: Point): { c1: Point, c2: Point } {
        const dx1 = s1.x - s2.x;
        const dy1 = s1.y - s2.y;
        const dx2 = s2.x - s3.x;
        const dy2 = s2.y - s3.y;
        const m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
        const m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
        const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const dxm = (m1.x - m2.x);
        const dym = (m1.y - m2.y);
        const k = l2 / (l1 + l2);
        const cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
        const tx = s2.x - cm.x;
        const ty = s2.y - cm.y;

        return {
            c1: new Point(m1.x + tx, m1.y + ty),
            c2: new Point(m2.x + tx, m2.y + ty)
        };
    }

    private addCurve(curve: Bezier): void {
        const startPoint = curve.startPoint;
        const endPoint = curve.endPoint;
        let velocity: number;
        let newWidth: number;

        velocity = endPoint.velocityFrom(startPoint);
        velocity = this.velocityFilterWeight * velocity + (1 - this.velocityFilterWeight) * this.lastVelocity;

        newWidth = this.strokeWidth(velocity);
        this.drawCurve(curve, this.lastWidth, newWidth);

        this.lastVelocity = velocity;
        this.lastWidth = newWidth;
    }

    private drawPoint(x: number, y: number, size: number): void {
        const ctx = this.context;

        ctx.moveTo(x, y);
        ctx.arc(x, y, size, 0, 2 * Math.PI, false);
        this.isEmpty = false;
    }

    private drawCurve(curve: Bezier, startWidth: number, endWidth: number) {
        const ctx = this.context;
        const widthDelta = endWidth - startWidth;
        let drawSteps: number;
        let width: number;
        let t: number;
        let tt: number;
        let ttt: number;
        let u: number;
        let uu: number;
        let uuu: number;
        let x: number;
        let y: number;

        drawSteps = Math.floor(curve.length());
        ctx.beginPath();
        for (let i = 0; i < drawSteps; i++) {
            // Calculate the Bezier (x, y) coordinate for this step.
            t = i / drawSteps;
            tt = t * t;
            ttt = tt * t;
            u = 1 - t;
            uu = u * u;
            uuu = uu * u;

            x = uuu * curve.startPoint.x;
            x += 3 * uu * t * curve.control1.x;
            x += 3 * u * tt * curve.control2.x;
            x += ttt * curve.endPoint.x;

            y = uuu * curve.startPoint.y;
            y += 3 * uu * t * curve.control1.y;
            y += 3 * u * tt * curve.control2.y;
            y += ttt * curve.endPoint.y;

            width = startWidth + ttt * widthDelta;
            this.drawPoint(x, y, width);
        }
        ctx.closePath();
        ctx.fill();
    }

    private strokeWidth(velocity: number): number {
        return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
    }

}
