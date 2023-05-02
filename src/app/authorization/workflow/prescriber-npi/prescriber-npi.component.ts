import { JsonPipe } from '@angular/common';
import { Component, OnInit, Output, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { PrescriberService } from 'src/app/api/services/prescriber/prescriber.service';
import { PrescriberResponseData } from 'src/app/api/shared/models/prescriber-form-data.model';
import { FormItem, FormOption } from 'src/app/form-configuration/shared/models/form-item.model';
import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';
import { FormNoModalComponent } from 'src/app/ui-components/form-controls/form-no-modal/form-no-modal.component';
import { GetProviderRequest, GetProviderRequestByName } from 'src/app/ui-components/shared/models/resource-collection-request.model';
import { ResourceCollectionResponseModel } from 'src/app/ui-components/shared/models/resource-collection-response.model';
import { FormCancelModalComponent } from '../../../ui-components/form-controls/form-cancel-modal/form-cancel-modal.component';
import { ServiceOfferingsEnum } from '../service-offerings.enum';
import { WorkflowService } from '../workflow.service';
import { PrescriberNpiService } from './prescriber-npi.service';

@Component({
  selector: 'app-prescriber-npi',
  templateUrl: './prescriber-npi.component.html',
  styleUrls: ['./prescriber-npi.component.scss']
})
export class PrescriberNpiComponent implements OnInit, AfterViewInit {

  @Output() continueButtonText: string;
  @Output() cancelButtonText: string;
  @Output() skipLinkText: string;
  @Output() invalidNpiMessage: string;
  @Output() continue: boolean;
  @Output() resultFound: boolean;

  public validateNPI: boolean;
  public searchByNPI: boolean;
  public stepContent: any;
  public validationMessage: any;
  public prescriberNpiNumberConfig: FormItem;
  public prescriberFirstnameConfig: FormItem;
  public prescriberLastnameConfig: FormItem;
  public prescriberZipConfig: FormItem;
  public prescriberNpiGroup: FormGroup;
  public prescriberSearchMsg: string;
  public drugUrl: string;
  public npiResultString: string;
  public link: any;
  public npiProviderQ: string;
  public errorMessage: any;
  public loading$ = new BehaviorSubject<boolean>(false);
  public showSkip: boolean;
  public prescriberSelectedConfig: FormItem;
  public searchAgain: boolean;
  public snackbarMessage: string;
  public isNpi: boolean;

  public prescriberSearchResponse: ResourceCollectionResponseModel<PrescriberResponseData>;
  public prescriberFromData: PrescriberResponseData = {};
  public prescriberInfo: FormOption[] = [];

  constructor(private prescriberNpiService: PrescriberNpiService,
    private workFlowService: WorkflowService,
    private prescriberService: PrescriberService,
    public translationService: TranslateContentService,
    private changeDetector: ChangeDetectorRef, public dialog: MatDialog,) {
    this.continue = false;
    this.searchByNPI = true;
  }

  ngOnInit(): void {
    this.prescriberNpiGroup = this.prescriberNpiService.createGroup();
    this.prescriberNpiService.addControlsToGroup();
    this.setControlConfigs();
    this.setViewContent();
    this.searchAgain = true;
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  public get prescriberNpiNumber(): FormControl {
    return this.prescriberNpiGroup.get('prescriberNpiNumber') as FormControl;
  }

  public get prescriberFirstname(): FormControl {
    return this.prescriberNpiGroup.get('prescriberFirstname') as FormControl;
  }

  public get prescriberLastname(): FormControl {
    return this.prescriberNpiGroup.get('prescriberLastname') as FormControl;
  }

  public get prescriberZip(): FormControl {
    return this.prescriberNpiGroup.get('prescriberZip') as FormControl;
  }


  public get prescriberSelected(): FormControl {
    return this.prescriberNpiGroup.get('prescriberSelected') as FormControl;
  }

  private setViewContent(): void {
    this.stepContent = this.prescriberNpiService.stepContent;
    this.link = this.prescriberNpiService.npiValidationMessage;
    this.validationMessage = this.prescriberNpiService.validationMessage;
    this.snackbarMessage = this.prescriberNpiService.snackbarMessage.prescriberSearchNotFound;
    this.prescriberSelectedConfig = this.prescriberNpiService.prescriberSelection();
    this.prescriberSearchMsg = this.prescriberNpiService.npiRegisteredMessage;
    if (this.workFlowService.prescriberNpiFormData.prescriberFirstname) {
      this.resultFound = true;
      this.prescriberFromData.firstName = this.workFlowService.prescriberNpiFormData.prescriberFirstname
    }
  }

  private setControlConfigs(): void {
    this.continueButtonText = this.prescriberNpiService.continueButtonText;
    this.cancelButtonText = this.prescriberNpiService.cancelButtonText;
    this.skipLinkText = this.prescriberNpiService.skipLinkText;
    this.invalidNpiMessage = this.prescriberNpiService.invalidNpiMessage;
    this.prescriberNpiNumberConfig = this.prescriberNpiService.prescriberNpiNumberConfig;
    this.prescriberFirstnameConfig = this.prescriberNpiService.prescriberFirstnameConfig;
    this.prescriberLastnameConfig = this.prescriberNpiService.prescriberLastnameConfig;
    this.prescriberZipConfig = this.prescriberNpiService.prescriberZipConfig;
  }

  public onFormDetailsChange(event: any) {
    this.isNpi = false;
    const fname = this.prescriberFirstname.value
    const lname = this.prescriberLastname.value
    const zip = this.prescriberZip.value
    this.resultFound = false;

    if ((fname && lname) && zip?.toString().length == 5) {
      this.loading$.next(true);
      const providerSearchRequest = this.getProviderSearchByName(fname, lname, zip);
      this.prescriberService.searchProviders(providerSearchRequest).subscribe((response) => {
        if (response != null && response.list.length > 0) {
          this.prescriberSearchResponse = response;
          //note for ticket sg-1416 - this can be loop through for displaying all result
          response.list.forEach(element => {      
            this.prescriberService.verifyNpi(element.npi)
            .subscribe(result => {
            if (result != null) {
              let address = '';
                  result.firstLineBusinessPracticeLocationAddress.split(' ').forEach((prescriber, index)=> {
                    // check if prescriber is a word 
                    if (prescriber.charAt(0).toUpperCase() == prescriber.charAt(0).toUpperCase()) {
                      address = address + prescriber.charAt(0).toUpperCase() + prescriber.substring(1, prescriber.length).toLowerCase()
                    }
                    else {
                      address = address + prescriber
                    }
                    index != element.firstLineBusinessPracticeLocationAddress.length-1 && (address = address + ' ');
                  })
                  
                  this.prescriberInfo.push(
                    {
                      displayedString: `${element.firstName.substring(0, 1)}${element.firstName.substring(1, element.firstName.length).toLowerCase()} 
                      ${element?.lastName.substring(0, 1)}${element?.lastName.substring(1, element?.lastName.length).toLowerCase()} • 
                      ${address} ${element?.businessPracticeLocationAddressCityName.substring(0, 1).toUpperCase()}${element?.businessPracticeLocationAddressCityName.substring(1, element?.businessPracticeLocationAddressCityName.length).toLowerCase()}, ${element?.businessPracticeLocationAddressStateName}. 
                      ${element?.businessPracticeLocationAddressPostalCode.slice(0, 5)} • 
                      (${element?.telephoneNumber.substring(0, 3)})${element?.telephoneNumber.substring(3, 6)}-${element?.telephoneNumber.substring(6, 10)} `,
                      valueString: JSON.stringify(element)
                    }
                  )
              this.prescriberSearchResponse = result;
              this.prescriberFromData = result;
              this.prescriberNpiService.prescriberInfo = this.prescriberInfo
              this.prescriberSelectedConfig = this.prescriberNpiService.prescriberSelection();
              this.workFlowService.prescriberFormData = this.prescriberFromData;
              this.resultFound = true;
              this.continue = true;
              this.errorMessage = null;
              this.showSkip = false;
              this.loading$.next(false);
            }
            else {
              this.prescriberSearchResponse = response;
              this.prescriberFromData = response.list[0];
              this.workFlowService.prescriberFormData = this.prescriberFromData;
              this.continue = true;
              this.resultFound = true;
              this.errorMessage = null;
              this.showSkip = true;
              this.loading$.next(false);
            }
          }
          );
          
          this.prescriberNpiService.prescriberInfo = this.prescriberInfo
          this.prescriberSelectedConfig = this.prescriberNpiService.prescriberSelection();
          this.workFlowService.prescriberFormData = this.prescriberFromData;
          });
        } else {
          this.errorMessage = this.prescriberNpiService.npiValidationMessage;
          this.prescriberNpiGroup.controls['prescriberNpiNumber'].setErrors({ 'invalid': true });
          this.resultFound = false;
          this.continue = false;
          this.showSkip = true;
          this.loading$.next(false);
        }
      })
    } else {
      this.continue = false;
      this.resultFound = false;
      this.errorMessage = null;
    }
  }

  public onNpiChange(event: any) {
    this.prescriberFromData.firstName = null
    this.isNpi = true;
    let value = event;
    this.resultFound = false;
    if (value.toString().length < 10 && this.prescriberNpiGroup.value) {
      this.prescriberNpiGroup.patchValue({
        "prescriberFirstname": null,
        "prescriberLastname": null,
        "prescriberZip": null,
        "prescriberSelected": null
      })
    }
    if (value.toString().length == 10) {
      this.loading$.next(true);
      const providerSearchRequest = this.getProviderSearchRequest(value);
      this.workFlowService.npi = value;
      this.prescriberService.searchProviders(providerSearchRequest)
        .subscribe(response => {
          if (response != null && response.list.length > 0) {
            this.prescriberService.verifyNpi(value)
              .subscribe(result => {
                if (result != null) {
                  this.prescriberSearchResponse = result;
                  this.prescriberFromData = result;
                  let address = '';
                  this.prescriberFromData.firstLineBusinessPracticeLocationAddress.split(' ').forEach((element, index)=> {
                    // check if element is a word 
                    if (element.charAt(0).toUpperCase() == element.charAt(0).toUpperCase()) {
                      address = address + element.charAt(0).toUpperCase() + element.substring(1, element.length).toLowerCase()
                    }
                    else {
                      address = address + element
                    }
                    index != this.prescriberFromData.firstLineBusinessPracticeLocationAddress.length-1 && (address = address + ' ');
                  })

                  this.prescriberInfo.push(
                    {
                      displayedString: `${this.prescriberFromData?.firstName.substring(0, 1)}${this.prescriberFromData?.firstName.substring(1, this.prescriberFromData?.firstName.length).toLowerCase()} 
                      ${this.prescriberFromData?.lastName.substring(0, 1)}${this.prescriberFromData?.lastName.substring(1, this.prescriberFromData?.lastName.length).toLowerCase()} • 
                      
                      ${address} ${this.prescriberFromData?.businessPracticeLocationAddressCityName.substring(0, 1).toUpperCase()}${this.prescriberFromData?.businessPracticeLocationAddressCityName.substring(1, this.prescriberFromData?.businessPracticeLocationAddressCityName.length).toLowerCase()}, ${this.prescriberFromData?.businessPracticeLocationAddressStateName}. 
                      ${this.prescriberFromData?.businessPracticeLocationAddressPostalCode.slice(0, 5)} • 
                      (${this.prescriberFromData?.telephoneNumber.substring(0, 3)})${this.prescriberFromData?.telephoneNumber.substring(3, 6)}-${this.prescriberFromData?.telephoneNumber.substring(6, 10)} `,
                      valueString: JSON.stringify(this.prescriberFromData)
                    }
                  )
                  this.prescriberNpiService.prescriberInfo = this.prescriberInfo
                  this.prescriberSelectedConfig = this.prescriberNpiService.prescriberSelection();
                  this.workFlowService.prescriberFormData = this.prescriberFromData;
                  this.resultFound = true;
                  this.continue = false;
                  this.errorMessage = null;
                  this.showSkip = false;
                  this.loading$.next(false);
                }
                else {
                  this.prescriberSearchResponse = response;
                  this.prescriberFromData = response.list[0];
                  this.workFlowService.prescriberFormData = this.prescriberFromData;
                  this.continue = false;
                  this.resultFound = true;
                  this.errorMessage = null;
                  this.showSkip = true;
                  this.loading$.next(false);
                }
              }
              );


          } else {
            this.errorMessage = this.prescriberNpiService.npiValidationMessage;
            this.prescriberNpiGroup.controls['prescriberNpiNumber'].setErrors({ 'invalid': true });
            this.resultFound = false;
            this.searchAgain = false
            this.continue = false;
            this.showSkip = true;
            this.workFlowService.openSnackBar(this.snackbarMessage, '', '')
            this.loading$.next(false);
          }
        },
          error => {
            this.resultFound = false;
            this.errorMessage = null;
            this.continue = false;
          });
    }
    else
      this.prescriberInfo = [];
    this.continue = false;
    this.resultFound = false;
    this.errorMessage = null;
  }

  public onPrescriberSelected(value: any) {
    if(this.isNpi) {
    this.prescriberNpiGroup.patchValue({
      "prescriberFirstname": JSON.parse(value).firstName,
      "prescriberLastname": JSON.parse(value).lastName,
      "prescriberZip": JSON.parse(value).postalCode.substring(0, 5)
    })
    
    this.workFlowService.prescriberInformationFormData.prescriberFirstName = JSON.parse(value).firstName;
    this.workFlowService.prescriberInformationFormData.prescriberLastName = JSON.parse(value).lastName;
    this.workFlowService.prescriberInformationFormData.prescriberNpi = JSON.parse(value).npi;
    this.workFlowService.prescriberInformationFormData.postalCode = JSON.parse(value).postalCode;
    } 
    if(!this.isNpi){
      this.prescriberNpiGroup.patchValue({
        "prescriberNpiNumber": JSON.parse(value).npi,
      })
      this.workFlowService.prescriberInformationFormData.prescriberFirstName = JSON.parse(value).firstName;
      this.workFlowService.prescriberInformationFormData.prescriberLastName = JSON.parse(value).lastName;
      this.workFlowService.prescriberInformationFormData.prescriberNpi = JSON.parse(value).npi;
      this.workFlowService.prescriberInformationFormData.postalCode = JSON.parse(value).postalCode;
    
    }
      
    this.continue = true;
  }

  public onSkipClick(): void {
    this.workFlowService.navigateToSpecificPath("prescriber-information");
  }

  private getProviderSearchRequest(npi): GetProviderRequest {
    const request = new GetProviderRequest(npi);
    return request;
  }
  private getProviderSearchByName(fname, lname, zip): GetProviderRequestByName {
    const request = new GetProviderRequestByName(fname, lname, zip);
    return request;
  }

  public changeFormClick() {
    this.searchByNPI = !this.searchByNPI;
  }

  public cancelBtnClick(): void {
    this.dialog.open(FormCancelModalComponent);
  }

  public continueBtnClick(): void {
    this.prescriberNpiService.setFormData(this.prescriberNpiGroup.value);
    this.workFlowService.navigateToNextStep();
  }

  public resetSearch(): void {
    this.searchAgain = true;
    this.resultFound = null
  }
}
