import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InsuranceViewModel } from 'src/app/api/shared/models/abv/insurance-view.model';
import { ViewInsuranceModalTranslation } from 'src/app/translation/shared/language/translations.models';
import { ViewInsuranceModalService } from './view-insurance-modal.service';

@Component({
  selector: 'app-view-insurance-modal',
  templateUrl: './view-insurance-modal.component.html',
  styleUrls: ['./view-insurance-modal.component.scss']
})
export class ViewInsuranceModalComponent implements OnInit {

  public viewContent: ViewInsuranceModalTranslation = null;
  public insuranceData: InsuranceViewModel = null;

  constructor(private viewInsuranceModalService: ViewInsuranceModalService,
              private dialogRef: MatDialogRef<ViewInsuranceModalComponent>) { }

  ngOnInit(): void {
    this.viewContent = this.viewInsuranceModalService.insuranceFormTranslation;
    this.insuranceData = this.viewInsuranceModalService.insuranceData;
  }

  public close(): void {
    this.dialogRef.close();
  }
}
