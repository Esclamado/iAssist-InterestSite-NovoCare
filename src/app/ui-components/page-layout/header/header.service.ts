import { Injectable } from '@angular/core';
import { FormItem } from 'src/app/form-configuration/shared/models/form-item.model';
import { FormCreationService } from 'src/app/form-configuration/services/form-creation/form-creation.service';
import { FormGroup } from '@angular/forms';
import { SupportedLanguages } from 'src/app/translation/shared/enums/supported-languages.enum';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public get languageConfig(): FormItem {
    return this.formCreationService.createItem(this.controlLanguage, null, null, [
      { valueString: SupportedLanguages.English, displayedString: 'English' },
      { valueString: SupportedLanguages.Spanish, displayedString: 'Español' }
    ]);
  }

  public languageGroup: FormGroup;

  private controlLanguage = 'language';

  constructor(private formCreationService: FormCreationService) {
    this.languageGroup = this.formCreationService.createGroup();
    formCreationService.addControl(this.languageGroup, this.controlLanguage, false, null, SupportedLanguages.English);
   }
}
