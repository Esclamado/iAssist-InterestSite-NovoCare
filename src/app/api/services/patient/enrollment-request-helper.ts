import * as moment from "moment";
import { WorkflowService } from "src/app/authorization/workflow/workflow.service";
import { DocumentRequest } from "../../shared/models/documents/document-request.model";
import { ServiceOfferingsEnum } from 'src/app/authorization/workflow/service-offerings.enum';
import { PatientService } from "./patient.service";

export class EnrollmentRequestHelper {
    private today: string;
    private documentName: string;

    constructor(private workflowService: WorkflowService,
                private documentId: string,
                private documentType: string) {
        this.today = moment().format('MM/DD/YYYY');
        this.documentName = this.workflowService.enrollmentDocumentName;
        if (this.workflowService.GROWTH_THERAPY.includes(this.workflowService.getSelectedOffering())) {
            this.documentName = this.workflowService.setFormattedFileName(`ENDO${this.documentType}`);
        }
        if (this.workflowService.OBESITY_THERAPY.includes(this.workflowService.getSelectedOffering())) {
            this.documentName = this.workflowService.setFormattedFileName(`OBES${this.documentType}`);
        }
        if (this.workflowService.RAREBLOOD_THERAPY.includes(this.workflowService.getSelectedOffering())) {
            this.documentName = this.workflowService.setFormattedFileName(`RB${this.documentType}`);
        }
        this.workflowService.enrollmentDocumentName = this.documentName;
    }

    public buildEnrollmentRequest(): DocumentRequest {
        let documentRequest = new DocumentRequest();
        documentRequest.templateDocumentId = this.documentId;
        documentRequest.documentName = this.documentName;
        documentRequest.formData = { data: {}};

        documentRequest = this.buildPatientSection(documentRequest);
        return documentRequest;
    }

    private buildSupportRequestedSection(request: DocumentRequest): DocumentRequest {
        const chosenServices = this.workflowService.selectedServiceType ? this.workflowService.selectedServiceType : null
        const selectedDrugName = this.workflowService.selectedDrugName

        request.formData.data['elitek'] = this.checkboxFormData(selectedDrugName == 'Elitek')
        request.formData.data['jevtana'] = this.checkboxFormData(selectedDrugName == 'Jevtana')
        request.formData.data['sarclisa'] = this.checkboxFormData(selectedDrugName == 'Sarclisa')

        if (chosenServices != null) {
            request.formData.data['access'] = this.checkboxFormData(chosenServices.serviceTypeSelected[0] || chosenServices.serviceTypeSelected[1])
            request.formData.data['financial'] = this.checkboxFormData(chosenServices.serviceTypeSelected[2] || chosenServices.serviceTypeSelected[3])
            request.formData.data['resource'] = this.checkboxFormData(chosenServices.serviceTypeSelected[4])
            request.formData.data['pa'] = this.checkboxFormData(chosenServices.serviceTypeSelected[0])
            request.formData.data['claims'] = this.checkboxFormData(chosenServices.serviceTypeSelected[1])
            request.formData.data['copay'] = this.checkboxFormData(chosenServices.serviceTypeSelected[2])
            request.formData.data['pap'] = this.checkboxFormData(chosenServices.serviceTypeSelected[3])
        }

        return request;
    }

    private buildPatientSection(request: DocumentRequest): DocumentRequest {
        const patientFormData = this.workflowService.patientFormData;
        const patientAuthorizationFormData = this.workflowService.patientAuthorizationFormData;
        let getMonths = moment().diff(patientFormData.dateOfBirth, 'months');
        let age = Math.round(getMonths / 12);

        if (this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.GrowthPatientAuth ||
            this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.ObesityPatientAuth ||
            this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.RareBloodPatientAuth) {
                request.formData.data['pt_auth'] = this.checkboxFormData(true);
                request.formData.data['attached_pt_auth'] = 'YES';

        } else if (this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.GrowthDoc ||
            this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.ObesityDoc ||
            this.workflowService.getSelectedOffering() === ServiceOfferingsEnum.RareBloodDoc) {
                request.formData.data['doc_upload'] = this.checkboxFormData(true);
                request.formData.data['doc_count'] = this.workflowService.uploadedDocuments.length;
        } else {
            request.formData.data['pt_auth'] = this.checkboxFormData(true);
            request.formData.data['attached_pt_auth'] = 'YES';
            request.formData.data['doc_upload'] = this.checkboxFormData(true);
            request.formData.data['doc_count'] = this.workflowService.uploadedDocuments.length;
        }

        request.formData.data['date'] = this.today;
        request.formData.data['pt_first'] = patientFormData.firstName;
        request.formData.data['pt_last'] = patientFormData.lastName;
        request.formData.data['pt_dob'] = moment(patientFormData.dateOfBirth).format('MM/DD/YYYY');
        request.formData.data['pt_zip'] = patientFormData.postalCode;
        request.formData.data['pt_phone'] = patientFormData.primaryPhone;
        request.formData.data['pt_home'] = patientFormData.altPhone;
        request.formData.data['pt_age'] = age;
        request.formData.data['cg_first'] = patientFormData.caregiverFirstName;
        request.formData.data['cg_last'] = patientFormData.caregiverLastName;
        request.formData.data['cg_relation'] = patientFormData.caregiverRelationshipToPatient;
        request.formData.data['cg_phone'] = patientFormData.caregiverPhone;

        if (patientFormData.altContactOrCaregiver == "Y") {
            request.formData.data['alt_first'] = patientFormData.caregiverFirstName;
            request.formData.data['alt_last'] = patientFormData.caregiverLastName;
            request.formData.data['alt_phone'] = patientFormData.caregiverPhoneType == "Home" ? patientFormData.caregiverPhone : null;
            request.formData.data['alt_phone_mobile'] = patientFormData.caregiverPhoneType == "Cell" ? patientFormData.caregiverPhone : null;
            request.formData.data['alt_home'] = this.checkboxFormData(patientFormData.caregiverPhoneType == "Home")
            request.formData.data['alt_mobile'] = this.checkboxFormData(patientFormData.caregiverPhoneType == "Cell")
            request.formData.data['alt_relation'] = patientFormData.caregiverRelationshipToPatient
            request.formData.data['alt_email'] = patientFormData.caregiverEmail
            request.formData.data['alt_contact_yes'] = this.checkboxFormData(patientFormData.caregiverPatientConsent == "Y" && age >= 18)
            request.formData.data['alt_contact_no'] = this.checkboxFormData(patientFormData.caregiverPatientConsent != "Y" && age >= 18)
        }

        const fullName = patientFormData.firstName + " " + patientFormData.lastName
        const patientAuthorizing = patientAuthorizationFormData.whoIsAuthorizing === 'Patient';
        const signature = patientAuthorizing ? patientAuthorizationFormData.signature : patientAuthorizationFormData.legalSignature;
  
            request.formData.data['pt_sig_consent'] =
            {
                '@type': 'image',
                'value': signature
            }
            request.formData.data['date_consent'] = this.today
            request.formData.data['pt_sig_auth'] =
            {
                '@type': 'image',
                'value': signature
            }
            request.formData.data['print_consent'] = patientAuthorizing ? fullName : `${patientAuthorizationFormData.legalRepFullName} / ${patientAuthorizationFormData.relationToPatient}`

            if (patientAuthorizationFormData.authorizationOption === 'PAuth' || patientAuthorizationFormData.authorizationOption === 'Both' || patientAuthorizationFormData.authorizationOption === '') {
                request.formData.data['date_auth'] = this.today
                request.formData.data['legal_rep_auth'] = patientAuthorizationFormData.whoIsAuthorizing == 'Patient' ? null : this.checkboxFormData(patientAuthorizationFormData.hipaaConsent?.hipaa)
                request.formData.data['legal_rep_name_auth'] = patientAuthorizationFormData.legalRepFullName
                request.formData.data['legal_rep_relation_auth'] = patientAuthorizationFormData.relationToPatient
                request.formData.data['pt_signature_auth'] = 
                {
                    '@type': 'image',
                    'value': signature
                }
            }

            request.formData.data['sms_yes'] = this.checkboxFormData(patientAuthorizationFormData.smsConsent?.sms)
            request.formData.data['marketing_yes'] = this.checkboxFormData(patientAuthorizationFormData.marketingMsgConsent?.marketingMsg)
            request.formData.data['fcra_yes'] = this.checkboxFormData(patientAuthorizationFormData.fcraConsent?.fcra)
            
            if (patientAuthorizationFormData.authorizationOption === 'PAP' || patientAuthorizationFormData.authorizationOption === 'Both') {
                request.formData.data['pt_signature_pap'] = 
                {
                    '@type': 'image',
                    'value': signature
                }
                request.formData.data['date_pap'] = this.today
                request.formData.data['legal_rep_pap'] = patientAuthorizationFormData.legalRepFullName
                request.formData.data['legal_rep_relation_pap'] = patientAuthorizationFormData.relationToPatient

                if (patientAuthorizationFormData.medEnrollAuthConsent?.medEnrollAuth) {
                    request.formData.data['pt_signature_medd'] = 
                    {
                        '@type': 'image',
                        'value': signature
                    }
                    request.formData.data['date_medd'] = this.today
                    request.formData.data['legal_rep_medd'] = patientAuthorizationFormData.legalRepFullName
                    request.formData.data['legal_rep_relation_medd'] = patientAuthorizationFormData.relationToPatient
                }
            }

        return request;
    }

    private buildInsuranceSection(request: DocumentRequest): DocumentRequest {
        let insuranceFormData = this.workflowService.insuranceInformationFormData;
        request.formData.data['insured_yes'] = this.checkboxFormData(insuranceFormData.hasInsurance == "Y")
        request.formData.data['insured_no'] = this.checkboxFormData(insuranceFormData.hasInsurance == "N")

        if (insuranceFormData.hasInsurance == "Y" && insuranceFormData.wantToUpload == "N") {
            request.formData.data['prim_insur_name'] = insuranceFormData.insuranceFormPrimary?.pbmName
            request.formData.data['prim_policy'] = insuranceFormData.insuranceFormPrimary?.policyholderIdNumber
            request.formData.data['prim_name'] = insuranceFormData.insuranceFormPrimary?.policyholderFirstName + " " + insuranceFormData.insuranceFormPrimary?.policyholderLastName
            request.formData.data['prim_relation'] = insuranceFormData.insuranceFormPrimary?.policyholderRelationshipToPatient
            request.formData.data['prim_phone'] = insuranceFormData.insuranceFormPrimary?.pbmPhoneNumber
            request.formData.data['prim_group'] = insuranceFormData.insuranceFormPrimary?.groupNumber
        }

        if (insuranceFormData.hasSecondaryInsurance == "Y") {
            request.formData.data['sec_insur_name'] = insuranceFormData.insuranceFormSecondary?.pbmName
            request.formData.data['sec_policy'] = insuranceFormData.insuranceFormSecondary?.policyholderIdNumber
            request.formData.data['sec_name'] = insuranceFormData.insuranceFormSecondary?.policyholderFirstName + " " + insuranceFormData.insuranceFormSecondary?.policyholderLastName
            request.formData.data['sec_relation'] = insuranceFormData.insuranceFormSecondary?.policyholderRelationshipToPatient
            request.formData.data['sec_phone'] = insuranceFormData.insuranceFormSecondary?.pbmPhoneNumber
            request.formData.data['sec_group'] = insuranceFormData.insuranceFormSecondary?.groupNumber
        }

        return request;
    }

    private buildPatientHouseholdSection(request: DocumentRequest): DocumentRequest {
        request.formData.data['numb_household'] = this.workflowService.incomeVerificationFormData.householdSize;
        request.formData.data['household_income'] = this.workflowService.incomeVerificationFormData.annualHouseholdIncome

        return request;
    }

    private buildPrescriberSection(request: DocumentRequest): DocumentRequest {
        const prescriberInformationFormData = this.workflowService.prescriberInformationFormData ? this.workflowService.prescriberInformationFormData : null
        const facilityInformationFormData = this.workflowService.facilityInformationFormData

        if (Object.keys(prescriberInformationFormData).length != 0) {
            request.formData.data['prescriber_fullname'] = this.capitalizeFirstLetter(prescriberInformationFormData.prescriberFirstName) + " " + this.capitalizeFirstLetter(prescriberInformationFormData.prescriberLastName)
            request.formData.data['prescriber_type'] = prescriberInformationFormData.prescriberSpecialty
            // 'State where licensed' is unmapped in the UI
            request.formData.data['sln'] = prescriberInformationFormData.prescriberStateNumber
            request.formData.data['npi'] = prescriberInformationFormData.prescriberNpi
            request.formData.data['tid'] = prescriberInformationFormData.taxIdNumber
            // 'Physician name (if different from Prescriber)' is unmapped in the UI
            // 'State where licensed' is unmapped in the UI
            // 'State License #' is unmapped in the UI
            request.formData.data['facility_name'] = facilityInformationFormData.facilityName
            request.formData.data['office'] = this.checkboxFormData(facilityInformationFormData.facilityType == 'Prescriber Office/Clinic')
            request.formData.data['outpatient'] = this.checkboxFormData(facilityInformationFormData.facilityType == 'Hospital Outpatient')
            request.formData.data['inpatient'] = this.checkboxFormData(facilityInformationFormData.facilityType == 'Hospital Inpatient')
            request.formData.data['facility_address'] = facilityInformationFormData.addressLine1 + (facilityInformationFormData.addressLine2 ? (", " + facilityInformationFormData.addressLine2) : "");
            request.formData.data['facility_city'] = facilityInformationFormData.city
            request.formData.data['facility_state'] = facilityInformationFormData.state
            request.formData.data['facility_zip'] = facilityInformationFormData.zipCode
            request.formData.data['contact_name'] = facilityInformationFormData.primaryContactName
            request.formData.data['contact_title'] = facilityInformationFormData.role
            request.formData.data['prescriber_phone'] = facilityInformationFormData.primaryPhoneNumber
            request.formData.data['prescriber_fax'] = facilityInformationFormData.primaryFaxNumber
            request.formData.data['prescriber_email'] = facilityInformationFormData.primaryEmail

        }

        return request
    }

    private buildMedicationSection(request: DocumentRequest): DocumentRequest {
        const selectedDrug = this.workflowService.selectedDrugName
        const prescriptionInformationFormData = this.workflowService.prescriptionInformationFormData

        if (selectedDrug == "Elitek") {
            request.formData.data['elitek_icd10'] = prescriptionInformationFormData.icd10Code
            request.formData.data['elitek_dose'] = prescriptionInformationFormData.dosage
            request.formData.data['elitek_quan'] = prescriptionInformationFormData.quantity
        }
        else if (selectedDrug == "Jevtana") {
            request.formData.data['jevtana_icd10'] = prescriptionInformationFormData.icd10Code
            request.formData.data['jevtana_dose'] = prescriptionInformationFormData.dosage
            request.formData.data['jevtana_quan'] =  prescriptionInformationFormData.quantity
            request.formData.data['jevtana_refi'] = prescriptionInformationFormData.refills
        }
        else if (selectedDrug == "Sarclisa") {
            request.formData.data['sarclisa_icd10'] = prescriptionInformationFormData.icd10Code
            request.formData.data['sarclisa_dose'] = prescriptionInformationFormData.dosage
            request.formData.data['sarclisa_quan'] =  prescriptionInformationFormData.quantity
            request.formData.data['sarclisa_refi'] = prescriptionInformationFormData.refills
            request.formData.data['cvs'] = this.checkboxFormData(prescriptionInformationFormData.specialtyPharmacy == "CVS Specialty")
            request.formData.data['biologics'] = this.checkboxFormData(prescriptionInformationFormData.specialtyPharmacy == "Biologics")
        }

        return request;
    }

    private buildPrescriberDeclaration(request: DocumentRequest): DocumentRequest {
        const prescriberDeclaration = this.workflowService.provideAttestationFormData
        const prescriberInformationFormData = this.workflowService.prescriberInformationFormData

        if (Object.keys(prescriberDeclaration).length != 0) {
            request.formData.data['prescriber_signature'] =
            {
                '@type': 'image',
                'value': prescriberDeclaration.prescriberCertificationSignature
            }
            request.formData.data['prescriber_print'] = this.capitalizeFirstLetter(prescriberInformationFormData.prescriberFirstName) + " " + this.capitalizeFirstLetter(prescriberInformationFormData.prescriberLastName)
            request.formData.data['prescriber_signature_date'] = this.today

        }

        return request;
    }

    public checkboxFormData(value: boolean): string {
        if (value) {
          return 'Yes';
        } else {
          return '';
        }
    }

    public capitalizeFirstLetter(string: string): string {
        const newString = string.charAt(0) + string.substring(1).toLowerCase()

        return newString
    }
}
