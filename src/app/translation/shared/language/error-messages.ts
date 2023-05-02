/**
 * Error Message Translation Class
 */
 class ErrorMessageTranslation {
  english: string;
  spanish: string;
}

/**
* Error Messages Class
*/
export class ErrorMessages {
    required: ErrorMessageTranslation;
    firstNameInvalid: ErrorMessageTranslation;
    lastNameInvalid: ErrorMessageTranslation;
    faxInvalid: ErrorMessageTranslation;
    officeContactNameInvalid: ErrorMessageTranslation;
    preferredContactRequired: ErrorMessageTranslation;
    phoneNumberInvalid: ErrorMessageTranslation;
    dateInvalid: ErrorMessageTranslation;
    zipInvalid: ErrorMessageTranslation;
    emailInvalid: ErrorMessageTranslation;
    npiInvalid: ErrorMessageTranslation;
    alphaInvalid: ErrorMessageTranslation;
    addressInvalid: ErrorMessageTranslation;
    groupNumberInvalid: ErrorMessageTranslation;
    binNumberInvalid: ErrorMessageTranslation;
    pcnNumberInvalid: ErrorMessageTranslation;
    stateInvalid: ErrorMessageTranslation;
    cityInvalid: ErrorMessageTranslation;
    otherPreferredLanguageInvalid: ErrorMessageTranslation;
    otherPreferredPharmacyInvalid: ErrorMessageTranslation;
    nameInvalid: ErrorMessageTranslation;
    relationshipInvalid: ErrorMessageTranslation;
    signatureInvalid: ErrorMessageTranslation;
    initialsInvalid: ErrorMessageTranslation;
    numericInvalid: ErrorMessageTranslation;
    icd10CodeInvalid: ErrorMessageTranslation;
    dosageInvalid: ErrorMessageTranslation;
    quantityInvalid: ErrorMessageTranslation;
    facilityNameInvalid: ErrorMessageTranslation;
    roleInvalid: ErrorMessageTranslation
    householdSizeInvalid: ErrorMessageTranslation;
    annualHouseholdIncomeInvalid: ErrorMessageTranslation;
    scrollToAcknowledge: ErrorMessageTranslation;

  constructor() {
      this.required = {
          english: 'Field is required',
          spanish: 'Obligatorio'
      };

        this.firstNameInvalid = {
            english: 'Please enter a valid first name',
            spanish: 'Por favor, ingrese un nombre válido'
        };

        this.lastNameInvalid = {
            english: 'Please enter a valid last name',
            spanish: 'Por favor ingrese un apellido válido'
        };

        this.faxInvalid = {
            english: 'Please enter a valid fax number',
            spanish: 'Introduzca un número de fax válido'
        };

        this.officeContactNameInvalid = {
            english: 'Please enter a valid contact name',
            spanish: 'Por favor ingrese un nombre de contacto válido'
        };

      this.preferredContactRequired = {
          english: 'Please select a preferred contact number',
          spanish: 'Seleccione un número de contacto preferido'
      };

        this.phoneNumberInvalid = {
            english: 'Please enter a valid  phone number',
            spanish: 'Proporcione un número de teléfono válido'
        };

      this.dateInvalid = {
          english: 'Please enter a valid date',
          spanish: 'Obligatorio'
      };

      this.zipInvalid = {
          english: 'Please enter a valid zip code',
          spanish: 'Proporcione un código postal válido'
      };

        this.npiInvalid = {
            english: 'Please enter a valid NPI',
            spanish: 'Ingrese un npi válido'
        };

        this.emailInvalid = {
            english: 'Please enter a valid email address',
            spanish: 'Proporcione una dirección de correo electrónico válida'
        };

        this.addressInvalid = {
            english: 'Please enter a valid address',
            spanish: 'Proporcione una dirección válida'
        };

        this.alphaInvalid = {
            english: 'Please use only alpha characters',
            spanish: 'Utilice solo caracteres alfabéticos'
        };

        this.groupNumberInvalid = {
            english: 'Please enter a valid group number',
            spanish: 'Proporcione un número de grupo válido'
        };

        this.binNumberInvalid = {
            english: 'Please enter a valid BIN number',
            spanish: 'Proporcione un número BIN válido'
        };

        this.pcnNumberInvalid = {
            english: 'Please enter a a valid PCN number',
            spanish: 'Proporcione un número de PCN válido'
        };
        this.stateInvalid = {
            english: 'Please enter a valid State',
            spanish: 'Proporcione un estado válido'
        };
        this.cityInvalid = {
            english: 'Please enter a valid city',
            spanish: 'Proporcione una ciudad válida'
        };
        this.otherPreferredLanguageInvalid = {
            english: 'Please enter a valid language',
            spanish: 'Proporcione un idioma preferido válido'
        };
        this.otherPreferredPharmacyInvalid = {
            english: 'Please enter a valid pharmacy',
            spanish: 'Proporcione una farmacia preferida válida'
        };
        this.nameInvalid = {
            english: 'Please enter a valid name',
            spanish: 'Proporcione un nombre válido'
        };
        this.relationshipInvalid = {
            english: 'Please enter a valid relationship',
            spanish: 'Proporcionar una relación válida'
        };
        this.signatureInvalid = {
            english: 'Please enter a valid name',
            spanish: 'Proporcione una firma válida'
        };
        this.initialsInvalid = {
            english: 'Please enter valid initials',
            spanish: 'Proporcione iniciales válidas'
        };

        this.numericInvalid = {
            english: 'Please use only numeric characters',
            spanish: 'Utilice solo caracteres numéricos'
        };

        this.icd10CodeInvalid = {
            english: 'Please enter a valid code',
            spanish: 'Proporcione un código válido'
        };

        this.dosageInvalid = {
            english: 'Please enter a valid dosage',
            spanish: 'Proporcione una dosis válida'
        };

        this.quantityInvalid = {
            english: 'Please enter a valid quantity',
            spanish: 'Proporcione una cantidad válida'
        };
        this.facilityNameInvalid = {
            english: 'Please enter a valid facility name',
            spanish: 'Proporcione un nombre de instalación válido'
        }

        this.roleInvalid = {
            english: 'Please enter a valid role',
            spanish: 'Proporcione un rol válido'
        }
        
        this.householdSizeInvalid = {
            english: 'Please enter a valid household size',
            spanish: 'Proporcione un tamaño familiar válido'
        };
        this.annualHouseholdIncomeInvalid = { 
            english: 'Please enter a valid annual household income',
            spanish: 'Proporcione un ingreso familiar anual válido'
        };
        this.scrollToAcknowledge = {
            english: 'You must read the above text by scrolling to the bottom of the box before acknowledging',
            spanish: 'Debe leer el texto anterior desplazándose hasta la parte inferior del cuadro antes de reconocer'
        }
    }
}
