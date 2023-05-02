import { TranslateContentService } from 'src/app/translation/services/translate-content/translate-content.service';

 /**
  * TODO: no need to create a Mask Type, masks should be associated with the validation set to a field.
  * By creating a mask type object, you can create issues where fields have a different masks compared to their
  * actual validation regexp expression. Please re-visit.
  */

class FormItem {
    private errorMessages: any;

    public text: string;
    public controlName: string;
    public placeholder: string;
    public optionalText: string;
    public option: Array<FormOption>;
    public required: boolean;
    public description: string;
    public maskType: MaskType;
    public tooltip: string;

    public get errorMessage(): string {
      const language = this.translateService.languageSelected;
      return this.errorMessages[language];
    }

    constructor(
      private translateService: TranslateContentService,
      controlName: string,
      text: string,
      optionalText?: string,
      placeholder?: string,
      option?: Array<FormOption>,
      required?: boolean,
      errorMessages?: object,
      description?: string,
      maskType?: MaskType,
      tooltip?: string
      ) {
      this.controlName = controlName;
      this.text = text;
      this.optionalText = optionalText;
      this.placeholder = placeholder;
      this.option = option;
      this.required = required;
      this.description = description;
      this.maskType = maskType;
      this.errorMessages = errorMessages || {};
      this.tooltip = tooltip;
    }
}

class FormOption {
  public valueString?: string;
  public displayedString: string;
  public serviceTitle?: string;
  public subdescription?: string;
  public tooltip?: string;
  public isChecked?: boolean;
  public isDisabled?: boolean;
}

class MaskType {
    public isDate?: boolean;
    public isPhoneNumber?: boolean;
    public maxLength?: number;
    public minLength?: number;
    public isNumeric?: boolean;
    public isAlphaNumeric?: boolean;
    public isPostalCode?: boolean;
    public isNPI?: boolean;
    public isTax?: boolean;
    public isIcd10Code?: boolean
}

export { FormItem, FormOption, MaskType };

