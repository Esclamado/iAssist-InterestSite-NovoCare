import { Component, Inject } from "@angular/core";
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: '...',
  template: `
  <div class="notification-container">
    <div class="notification-body">
      <mat-icon *ngIf="data?.icon">{{ data?.icon }}</mat-icon>
      <span>{{ data?.message }}</span>
    </div>
    <button mat-button (click)="snackbarRef.dismiss()"><span>{{ data?.action }}</span></button>
  </div>
  `
})
export class SnackbarIconComponent {
  constructor(
    public snackbarRef: MatSnackBarRef<SnackbarIconComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
