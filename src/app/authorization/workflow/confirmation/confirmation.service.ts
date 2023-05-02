import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormCreationService } from "src/app/form-configuration/services/form-creation/form-creation.service";
import { TranslateContentService } from "src/app/translation/services/translate-content/translate-content.service";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  private documentForm: FormGroup;

  constructor(
    private formCreationService: FormCreationService,
    private translateContentService: TranslateContentService
) {}

  public get stepContent(): any {
    return this.translateContentService.confirmationView;
}

public get patientAuthorizationLabel(): any {
  return this.translateContentService.confirmationView.patientAuthorizationLabel;
}

}
