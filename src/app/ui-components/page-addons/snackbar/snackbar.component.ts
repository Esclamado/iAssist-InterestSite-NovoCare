import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  @Input() content = '';
  @Output() afterClose = new EventEmitter();

  animationDone(event: AnimationEvent) {
    if (event.animationName === 'snackbarOut') {
      this.afterClose.emit(true);
    }
  }

  constructor(private host: ElementRef<HTMLElement>) { }

  get container(): HTMLElement {
    return this.host.nativeElement.querySelector('.snackbar-container') as HTMLElement;
  }

  close() {
    this.container.style.animation = 'snackbarOut 0.3s';
  }

}
