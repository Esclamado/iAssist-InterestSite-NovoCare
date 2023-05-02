import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, OnInit } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    constructor(private resolver: ComponentFactoryResolver, private injector: Injector, @Inject(DOCUMENT) private document: Document) {}

    open(content: string) {
        const factory = this.resolver.resolveComponentFactory(SnackbarComponent);
        const componentRef = factory.create(this.injector);

        componentRef.instance.content = content;
        componentRef.hostView.detectChanges();

        const { nativeElement } = componentRef.location;

        this.document.body.appendChild(nativeElement);

        componentRef.instance.afterClose.subscribe(() => {
            componentRef.destroy();
            this.document.body.removeChild(nativeElement);
        });

        setTimeout(function () {
            componentRef.instance.close();
            setTimeout(function () {
                componentRef.destroy();
            }, 500);
        }, 5000);
    }
}
