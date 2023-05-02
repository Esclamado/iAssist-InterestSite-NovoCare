import { DocumentType } from 'src/app/api/shared/enums/document-type.enum';
import { ServiceOfferingsEnum } from 'src/app/authorization/workflow/service-offerings.enum';
import { FormPlaceholderTranslation, InsuranceInformationTranslation } from './translations.models';

class Translation {
    header: {
        bannerText: string;
        introductionStatement: string;
        home: string;
        learnMore: string;
        headerLinkText: string;
        headerLinkUrl: string;
        headerLogoLinkUrl: string,
        headerText: string;
        dropdownMenuContent: any;
    };
    footer: {
        firstLine: string;
        secondLine: string;
        thirdLine: string;
        fourthLine: string;
        fifthLine: string;
        firstLineMobile: string;
        secondLineMobile: string;
        thirdLineMobile: string;
        fourthLineMobile: string;
        fifthLineMobile: string;
        sixthLineMobile: string;
        seventhLineMobile: string;
        eighthLineMobile: string;
        ninthLineMobile: string;
        tenthLineMobile: string;
        privacyText: string;
        privacyLink: string;
        legalLink: string;
        legalText: string;
        privacyPolicy: string;
        termAndConditions: string;
        clientLine: string;
        additionalClientLine: string;
        clientPrivacyLink:string;
        clientContactUsLink:string;
        clientLegalText: string;
        contactUs: string;
        novoNordiskUs: string;
        clientNovoNordiskUsLink: string;
        clientLineMobile: string;

    };
    formPlaceholder: FormPlaceholderTranslation;
    views: {
        welcome: any;
        patient: any;
        consent: any;
        confirmation: any;
        availableServices: any;
        prescriberNPIView: any;
        cancelModal: any;
        patientAssistanceProgramView: any;
        prescriberCertificationView: any;
        prescriberEmailSearch: any;
        providerAttestationView: any;
        patientDemographics: any;
        prescriberNewNPI: any;
        prescriberInformation: any;
        pricingBenefit: any;
        prescriberEmail: any;
        productSelection: any;
        chat: any;
        needAssistance: any;
        snackbar: any;
        documentUpload: any;
        bifoldLayout: any;
        actions: any;
        insuranceInformation: InsuranceInformationTranslation;
        patientAuthorization: any;
        facilityInformation: any;
        prescriptionInformation: any;
        incomeVerification: any;
        errorPage: any;
    };
}

export interface StepTranslation {
    header: string;
    subHeader?: string;
    description: string;
    back?: boolean;
    backText?: string;
}

export class ConsentContent {
    english: Translation;
    spanish: Translation;

    constructor() {
        const consentBrand = 'Brand X';
        const consentCompany = 'AssistRx';
        const consentContactPhone = '(877) 450-4412';
        const privacyLink = 'https://www.assistrx.com/privacy-policy/';
        const termUseLink = 'https://www.assistrx.com/terms-of-use/';
        const year = new Date().getFullYear();
        const needAssistanceOfficeSchedule = 'Monday-Friday, 8 am - 8 pm ET';
        const footerPhoneNumberPlaceholder = '[XXXXXXXXXX]';

        // English
        this.english = {
            header: {
                bannerText: 'For US Healthcare Professionals Only',
                introductionStatement:
                    `${consentBrand} is a support program dedicated to helping patients, caregivers, ` +
                    `and prescribers understand the prescription process, financial assistance, and insurance information for ` +
                    `${consentCompany} products.`,
                home: 'Home',
                learnMore: 'Learn More',
                headerLinkText: `SanofiCareASSIST.com/hcp`,
                headerLinkUrl: `www.sanoficareassist.com/hcp/`,
                headerLogoLinkUrl: `www.novocare.com`,
                headerText: 'For US Healthcare Professionals Only',
                dropdownMenuContent: {
                    title: 'Prescribing Information',
                    sections: [
                        {
                            sectionTitle: 'PRESCRIBING INFORMATION',
                            links: [
                                { title: 'Prescribing Information English', link: 'https://www.regeneron.com/downloads/dupixent_fpi.pdf' },
                                {
                                    title: 'Prescribing Information Spanish',
                                    link: ' https://www.regeneron.com/downloads/dupixent_fpisp.pdf'
                                }
                            ]
                        },
                        {
                            sectionTitle: 'PRE-FILLED SYRINGE INSTRUCTIONS FOR USE',
                            links: [
                                { title: '100mg Dose - English', link: 'https://www.regeneron.com/downloads/dupixent_100mg_ifu.pdf' },
                                { title: '100mg Dose - Spanish', link: 'https://www.regeneron.com/downloads/dupixent_ifu-100-spanish.pdf' },
                                { title: '200mg Dose - English', link: 'https://www.regeneron.com/downloads/dupixent_200mg_ifu.pdf' },
                                { title: '200mg Dose - Spanish', link: 'https://www.regeneron.com/downloads/dupixent_ifu-200-spanish.pdf' },
                                { title: '300mg Dose - English', link: 'https://www.regeneron.com/downloads/dupixent_ifu.pdf' },
                                { title: '300mg Dose - Spanish', link: 'https://www.regeneron.com/downloads/dupixent_ifu-300-spanish.pdf' }
                            ]
                        },
                        {
                            sectionTitle: 'PRE-FILLED PEN INSTRUCTIONS FOR USE',
                            links: [
                                { title: '200mg Dose - English', link: 'https://www.regeneron.com/downloads/dupixent_200mg_pfp_ifu.pdf' },
                                {
                                    title: '200mg Dose - Spanish',
                                    link: 'https://www.regeneron.com/downloads/dupixent_pfp_ifu-200-spanish.pdf'
                                },
                                { title: '300mg Dose - English', link: 'https://www.regeneron.com/downloads/dupixent_300mg_pfp_ifu.pdf' },
                                {
                                    title: '300mg Dose - Spanish',
                                    link: 'https://www.regeneron.com/downloads/dupixent_pfp_ifu-300-spanish.pdf'
                                }
                            ]
                        }
                    ]
                }
            },
            footer: {
                firstLine: `©2023 ${consentCompany}. All Rights Reserved. Intended for US residents only.`,
                secondLine: ``,
                thirdLine: '',
                fourthLine: '',
                fifthLine: ``,
                firstLineMobile: ``,
                secondLineMobile: ``,
                thirdLineMobile: '',
                fourthLineMobile: '',
                fifthLineMobile: ``,
                sixthLineMobile: ``,
                seventhLineMobile: ``,
                eighthLineMobile: ``,
                ninthLineMobile: ``,
                tenthLineMobile: ``,
                privacyText: 'Privacy Policy',
                privacyLink: 'https://www.assistrx.com/privacy-policy/ ',
                legalLink: 'https://www.assistrx.com/terms-of-use/',
                legalText: 'Terms of Use',
                clientLegalText: 'Terms & Conditions',
                privacyPolicy: privacyLink,
                termAndConditions: termUseLink,
                clientLine:`<span>NovoCare® and Novo Nordisk are registered trademarks of Novo Nordisk A/S.</span> <br>` +
                `<span>All other trademarks, registered or unregistered, are the property of their respective owners.</span> <br>` +
                `<span>© 2023 Novo Nordisk All rights reserved. APRIL 2023</span>`,
                clientLineMobile:`<span>NovoCare® and Novo Nordisk are registered trademarks of Novo Nordisk A/S.</span> <br>` +
                `<span>All other trademarks, registered or unregistered, <br> are the property of their respective owners.</span> <br>` +
                `<span>© 2023 Novo Nordisk All rights reserved. <br> APRIL 2023</span>`,
                additionalClientLine: 'MAT-US-2208636-v2.0-12/2022',
                clientPrivacyLink:`https://www.novonordisk-us.com/privacy-notice.html`,
                clientContactUsLink:`https://www.novocare.com/contact-us.html`,
                contactUs: 'Contact Us',
                novoNordiskUs: 'Novo Nordisk US',
                clientNovoNordiskUsLink: `https://www.novonordisk-us.com/`,
            },
            formPlaceholder: {
                dobPlaceholder: 'MM/DD/YYYY'
            },
            views: {
                welcome: {
                    step: {
                        header: 'Welcome',
                        description: 'Select an option to start your enrollment in the myRARE patient support program.'
                    },
                    body: {
                        pageHeader: 'Start your journey with',
                        pageHeaderLineTwo: '',
                        pageDescription: '',
                        pageDetails:'Receiving a life-changing diagnosis can be overwhelming, but getting the right support doesn\'t need to be. CareASSIST can help eligible patients  receive the assistance that is right for them. To get started, click the button below to complete our enrollment form.',
                        provider: 'HEALTHCARE PROVIDERS',
                        providerPatient: 'I AM A PATIENT',
                        documentUpload:'DOCUMENTATION UPLOAD',
                        options: [
                            {
                                value: 0,
                                title: 'Patient Consent for myRARE Patient Support Services',
                                description:
                                    'MyRARE is a patient support program designed to help with access, affordability, and resources.',
                                displayOption: true
                            },
                            {
                                value: 1,
                                title: 'Copay Assistance',
                                description:
                                    'Commercially insured patients may qualify to pay as as $0 per month for your treatment, subject to a maximum calendar year benefit of $100,000. There are no income requirements for the copay card.',
                                displayOption: false
                            },
                            {
                                value: 2,
                                title: 'Patient Assistance Program (PAP)',
                                description:
                                    'The Patient Assistance Program may help eligible patients get EVKEEZA at no cost if the patient meets income requirements and is uninsured or does not have coverage for EVKEEZA.',
                                displayOption: false
                            },
                            {
                                value: 3,
                                title: 'Upload Supporting Documentation',
                                description:
                                    'This option is for those that have already submitted an enrollment form and need to submit supporting documentation, such as proof of income, approval/denial letters, or a prior authorization.',
                                displayOption: true
                            }
                        ]
                    },
                    action: {
                        submitBtn: 'Continue'
                    }
                },
                prescriberInformation: {
                    dropdownPlaceholder: 'Select One',
                    step: {
                        header: 'Prescriber <br/> Information',
                        subHeader: '',
                        description:
                            'Please complete the following prescriber information.',
                        requiredText:
                            '<i>Please note:<text-required><span class="text-required"> All fields denoted with an asterisk (<span class="required">*</span>) are required.</span></i>',
                        back: 'Previous Step'
                    },
                    prescriberFirstName: 'First Name',
                    placeHolderFirstName: 'Input prescriber’s first name',
                    prescriberLastName: 'Last Name',
                    placeHolderLastName: 'Input prescriber’s last name',
                    prescriberSpecialty: 'Prescriber Specialty',
                    placeHolderPrescriberSpecialty: 'Prescriber specialty here',
                    taxIdNumber: 'Tax ID #',
                    placeHolderTaxIdNumber: 'Practice tax ID here',
                    prescriberStateNumber: {
                        label: 'Prescriber State License # ',
                        placeholder: 'Prescriber state license # here',
                        tooltip: 'Required for prescribers in Puerto Rico only.'
                    },
                    practiceSpecialty: {
                        label: 'Prescriber Specialty',
                        option: [
                            { valueString: 'Urology', displayedString: 'Urology' },
                            { valueString: 'Oncology', displayedString: 'Oncology' },
                            { valueString: 'Other', displayedString: 'Other' }
                        ]
                    },
                    prescriberNpi: 'NPI',
                    placeHolderNpi: 'Input prescriber’s NPI here',
                    practiceName: 'Practice Name',
                    officeContactName: 'Office Contact Name',
                    officeContactPhoneNumber: {
                        label: 'Prescriber State License # ',
                        tooltip:
                            'Required for prescribers in Puerto Rico only.'
                    },
                    officeFaxNumber: 'Office Fax Number',
                    practiceAddress1: 'Practice Address 1',
                    practiceAddress2: 'Practice Address 2',
                    city: 'City',
                    state: {
                        label: 'State'
                    },
                    postalCode: 'Tax ID #',
                    alertCannotVerify: 'Based on the information entered, we are unable to verify your identity. Please try again.',
                    alertFBAError: 'An error occurred, please try again.',
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                patientAssistanceProgramView: {
                    dropdownPlaceholder: 'Select One',
                    step: {
                        header: 'Patient Assistance Program',
                        subHeader: '',
                        description:
                            'Please answer the following questions so XTANDI Support Solutions can assess your patient’s eligibility for the Astellas Patient Assistance Program (PAP).',
                        requiredText:
                            '<i>Please note:<text-required><span class="text-required"> All fields denoted with an asterisk (<span class="required">*</span>) are required.</span></i>',
                        back: 'Previous Step'
                    },
                    patientAssistanceProgram: {
                        label: 'To evaluate your patient’s eligibility for the Astellas Patient Assistance Program (PAP), which of the following best describes your patient?',
                        option: [
                            {
                                valueString: 'My patient has no prescription insurance coverage',
                                displayedString: 'My patient has no prescription insurance coverage'
                            },
                            {
                                valueString: 'My patient has prescription insurance but it has denied coverage for XTANDI',
                                displayedString: 'My patient has prescription insurance but it has denied coverage for XTANDI'
                            },
                            {
                                valueString: 'My patient has Medicare Part D and cannot afford the out-of-pocket costs',
                                displayedString: 'My patient has Medicare Part D and cannot afford the out-of-pocket costs'
                            },
                            {
                                valueString: 'Not applicable. My patient does not need PAP',
                                displayedString: 'Not applicable. My patient does not need PAP'
                            }
                        ]
                    },
                    specialityPharmacy: {
                        label: 'Specialty Pharmacy'
                    },
                    pharmacyYesNo: {
                        label: 'Was the prescription previously sent to a specialty pharmacy?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' }
                        ]
                    },
                    pharmacyIfOther: 'Specialty Pharmacy if "other"',
                    cancelModal: {
                        title: 'Hold On!',
                        content:
                            'Are you sure you want to move forward without Prescriber Certification? XTANDI Support Solutions will not be able to complete the processing of your patient’s application without Prescriber Certification and will follow-up with your office for the necessary certification.',
                        yesLeave: 'Yes, Continue',
                        noContinue: 'No, Go Back'
                    },
                    ContinueNoteText:
                        '<p><b>Note:</b> To complete this application, please click &ldquo;Continue&rdquo;. XTANDI Support Solutions will verify eligibility and work with you to collect any additional patient information, should it be necessary, based on the patient&rsquo;s benefits investigation results.</p>',
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                prescriberCertificationView: {
                    dropdownPlaceholder: 'Select One',
                    step: {
                        header: 'Prescriber Certification',
                        subHeader: '',
                        description:'Please sign the prescriber’s certification to continue. ',
                        requiredText:'',
                        back: 'Previous Step'
                    },
                    whoIsAuthorizing: {
                        label: 'Who is authorizing?',
                        option: [
                            { valueString: 'Patient', displayedString: 'Patient' },
                            { valueString: 'Legal Representative', displayedString: 'Legal Representative' }
                        ]
                    },
                    legalDiscloser:
                        'If signed by someone other than the patient, please describe your legal authority/power of attorney to sign on behalf of the patient (e.g. guardian, custodian, healthcare power of attorney). Please note that if you are the patient&lsquo;s prescriber, that alone does not give you legal authority to sign on behalf of the patient.',
                    legalRepFullName: 'Legal Representative First and Last Name',
                    releationToPatient: 'Relationship to Patient',
                    patientAuthorizationStatement: {
                        label: 'Prescriber Certification',
                        content:'My signature below certifies that the person named on this form is my patient, the information provided on this application is complete and accurate to the best of my knowledge, and the medication received free of charge from the CareASSIST Patient Assistance Program in response to this application, if any, is exclusively for the patient named on this form. I certify that I have obtained my patient\'s written authorization in accordance with applicable state and federal law, including the Health Insurance Portability and Accountability Act of 1996 and its implementing regulations, to provide the individually identifiable health information on this form to CareASSIST for purposes of researching my patient\'s health insurance coverage for the medication on the Prescription Information step and assessing their eligibility for financial support programs offered through CareASSIST. It is my professional judgment that the medication selected on the Prescription Information step is medically necessary for the patient named on this form. I hereby certify that no medication received free of charge under the CareASSIST Patient Assistance Program shall be offered for sale, trade, or barter, and that no claim for reimbursement will be submitted to Medicare, Medicaid, or any third-party payer for medication received free of charge under the CareASSIST Patient Assistance Program. I consent to Sanofi and its affiliates and agents contacting me by fax, phone, mail, or email to confirm receipt of this medication and/or to provide additional information about this medication or CareASSIST. I understand that Sanofi may revise, change, or terminate any program services at any time without notice to me.'
                    },
                    doAgreeAuthorization: {
                        label: 'I agree',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' }
                        ]
                    },
                    PrescriberCertificationStatement: {
                        label: 'Prescriber Certification',
                        content: "My signature below certifies that the person named on this form is my patient, the information provided on this application is complete and accurate to the best of my knowledge, and the medication received free of charge from Sanofi Cares North America for the CareASSIST Patient Assistance Program in response to this application, if any, is exclusively for the patient named on this form. I certify that I have obtained my patient's written authorization in accordance with applicable state and federal law, including the Health Insurance Portability and Accountability Act of 1996 and its implementing regulations, to provide the individually identifiable health information on this form to CareASSIST for purposes of researching my patient's health insurance coverage for the medication on the Prescription Information step and assessing their eligibility for financial support programs offered through CareASSIST. It is my professional judgment that the medication selected on the Prescription Information step is medically necessary for the patient named on this form. I hereby certify that no medication received free of charge under the CareASSIST Patient Assistance Program shall be offered for sale, trade, or barter, and that no claim for reimbursement will be submitted to Medicare, Medicaid, or any third-party payer for medication received free of charge under the CareASSIST Patient Assistance Program. I consent to Sanofi and its affiliates and agents contacting me by fax, phone, mail, or email to confirm receipt of this medication and/or to provide additional information about this medication or CareASSIST. I understand that Sanofi may revise, change, or terminate any program services at any time without notice to me."

                    },
                    PrescriberCertification: {
                        label: 'Do you agree to the Prescriber Certification Statement?',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                            { valueString: 'N', displayedString: 'No' }
                        ],
                        optionalText:
                            '<div class="page-details"> Do NOT count your home, vehicles, personal possessions, resources you could not easily convert to cash, property you need for self-support (eg, rental property or land to grow produce for home consumption), nonbusiness property essential to your self-support, life insurance, burial expenses, interest earned on money you plan to use for burial expenses, burial plots, irrevocable burial contracts, or back payments from Social Security or Supplemental Security Income (SSI).</div>'
                    },
                    signature: {
                        signerFullName: 'Type Prescriber Signature',
                        placeholder:'Prescriber Signature',
                        typeItPreviewText: '',
                        signItPreviewText: 'Signature Box',
                        signItInstruction:
                            'By signing, you certify that you have read, understand, and agree to the Prescriber Certification statement above.',
                        clearText: 'Clear',
                        showSignTypeSelect: false
                    },
                    cancelModal: {
                        title: 'Hold On!',
                        content:
                            'Are you sure you want to move forward without Prescriber Certification? XTANDI Support Solutions will not be able to complete the processing of your patient’s application without Prescriber Certification and will follow-up with your office for the necessary certification.',
                        yesLeave: 'Yes, Continue',
                        noContinue: 'No, Go Back'
                    },
                    action: {
                        submitBtn: 'Submit',
                        cancelBtn: 'Cancel'
                    }
                },
                patient: {
                    dropdownPlaceholder: 'Select One',
                    step: {
                        header: 'Patient <br/>Information',
                        subHeader: 'STEP 1 OF 2',
                        description: '<p>Please provide the following patient information.</p>',
                        requiredText:'',
                        back: 'Previous Step',
                        required: { text: 'Required' }
                    },
                    firstName: 'First Name',
                    lastName: 'Last Name',
                    sex: {
                        label: 'Select Gender :',
                        option: [
                            { valueString: 'M', displayedString: 'Male' },
                            { valueString: 'F', displayedString: 'Female' },
                            { valueString: 'U', displayedString: 'Prefer not to answer' },
                        ],
                        tooltip:
                            'Astellas Pharma US, Inc., and its partners recognize that patients may not identify as male or female. However, many insurance companies still require that one of these two fields be used for each of their members. Please indicate the gender on file with the patient’s insurance company.'
                    },
                    dob: 'Date of Birth',
                    address: 'Address 1',
                    addressLine2: 'Address 2',
                    city: 'City',
                    state: {
                        label: 'State'
                    },
                    postalCode: 'Zip Code',
                    primaryContactNumber: {
                        label: 'Preferred #',
                        option: [
                            { valueString: '2', displayedString: 'Preferred #' }
                        ]
                    },
                    primaryPhone: 'Mobile Phone',
                    preferredAltContactNumber: {
                        label: 'Preferred #',
                        option: [
                            { valueString: '1', displayedString: 'Preferred #' }
                        ]
                    },
                    altPrimaryPhone: 'Home Phone',
                    preferredLanguage: {
                        label: 'Preferred Language',
                        option: [
                            { valueString: 'English', displayedString: 'English' },
                            { valueString: 'Spanish', displayedString: 'Spanish' },
                            { valueString: 'Other', displayedString: 'Other' }
                        ],
                        tooltip: 'XTANDI Support Solutions has translators available to speak to patients over the phone.'
                    },
                    preferredLanguageIfOther: 'Patient Preferred Language if "Other"',
                    preferredPharmacy: {
                        label: 'Patient Preferred Pharmacy',
                        tooltip:
                            'XTANDI Support Solutions will triage to the selected pharmacy. However, payer in-network requirements may take priority.'
                    },
                    altContactOrCaregiver: {
                        label: 'Add an Alternative Contact/Caregiver?',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                            { valueString: 'N', displayedString: 'No' }
                        ],
                        tooltip:''
                    },
                    preferredPharmacyIfOther: 'Patient Preferred Pharmacy if "Other"',
                    homePhone: 'Home Phone',
                    mobile: 'Mobile',
                    okToLeaveMessage: {
                        label: 'OK to Leave Detailed Message?',
                        option: [
                            { valueString: 'Y', displayedString: 'OK to Leave Detailed Message?' },
                            // { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    bestTimeToReachMe: {
                        label: 'Best time to reach me',
                        option: [
                            { valueString: 'Morning', displayedString: 'Morning' },
                            { valueString: 'Afternoon', displayedString: 'Afternoon' },
                            { valueString: 'Evening', displayedString: 'Evening' }
                        ]
                    },
                    emailAddress: 'Email Address',
                    dmdPrescriberName: 'DMD Prescriber Name',
                    alertCannotVerify: 'Based on the information entered, we are unable to verify your identity. Please try again.',
                    alertFBAError: 'An error occurred, please try again.',
                    actions: {
                        submitBtn: 'Continue'
                    },
                    caregiverFirstName: 'First Name',
                    caregiverLastName: 'Last Name',
                    caregiverEmail: 'Email',
                    caregiverPhone: 'Phone',
                    caregiverPhoneType: {
                        label: 'Type?',
                        option: [
                            { valueString: 'Cell', displayedString: 'Cell' },
                            { valueString: 'Home', displayedString: 'Home' }
                        ],
                    },
                    caregiverPatientConsent:{
                        label: 'The patient consents for the program to contact the',
                        rttp:'[RttP]',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                        ]
                    },
                    caregiverRelationshipToPatient: {
                        label: 'Relationship to the Patient',
                        option: [
                            { valueString: 'Spouse', displayedString: 'Spouse' },
                            { valueString: 'Parent', displayedString: 'Parent' },
                            { valueString: 'Child', displayedString: 'Child' },
                            { valueString: 'Unknown', displayedString: 'Unknown' },
                            { valueString: 'Other', displayedString: 'Other Relationship' }
                        ]
                    },

                    placeholders:{
                        patientFirstName:"Input patient's first name in here",
                        patientLastName:"Input patient's last name in here",
                        patientAddressLine1:"Input patient's address here",
                        patientAddressLine2:"Input building or suite # here",
                        patientCity:"Input patient's city here",
                        patientZip:"Input patient's zip code here",
                        patientPhone:"_ _ _-_ _ _-_ _ _ _",
                        patientEmail:"Input patient's email here",
                        caregiverFirstName:"Input caregiver's first name in here",
                        caregiverLastName:"Input caregiver's last name in here",
                        caregiverEmail:"Input caregiver's email here",
                        caregiverPhone:"Input caregiver's phone # here"
                    }
                },
                consent: {
                    step: {
                        header: 'Patient Consent',
                        subHeader: 'STEP 2 OF 2',
                        description: `Please review and provide your signature for ${consentBrand} program participation.`,
                        required: { text: 'Required' },
                        back: 'Back to previous step'
                    },
                    whoIsAuthorizing: {
                        label: 'Who is authorizing',
                        option: [
                            { valueString: 'Patient', displayedString: 'Patient' },
                            { valueString: 'Guardian/Caregiver', displayedString: 'Guardian/Caregiver' }
                        ]
                    },
                    relationshipToPatient: 'Relationship to Patient',
                    consentForm: {
                        label: 'Patient HIPAA Authorization and Program Participation',
                        option: [
                            {
                                valueString: 'a',
                                displayedString:
                                    'I acknowledge that I have read and understand the Patient HIPAA Authorization and ' +
                                    'Program Participation.'
                            }
                        ]
                    },
                    consentFormContent:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
                        'ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nibh tortor id' +
                        ' aliquet lectus proin nibh nisl condimentum id. Pellentesque nec nam aliquam sem. Metus vulputate eu scelerisque' +
                        ' felis imperdiet. In vitae turpis massa sed elementum tempus. Pulvinar neque laoreet suspendisse interdum. Euismod ' +
                        'in pellentesque massa placerat duis ultricies lacus sed turpis. Nibh venenatis cras sed felis. Lacus suspendisse ' +
                        'faucibus interdum posuere lorem ipsum dolor sit amet. Nunc congue nisi vitae suscipit tellus. Etiam dignissim diam ' +
                        'quis enim lobortis scelerisque fermentum dui. In massa tempor nec feugiat nisl pretium. Amet consectetur adipiscing ' +
                        'elit ut aliquam purus sit. Lectus magna fringilla urna porttitor. Aenean pharetra magna ac placerat. Integer enim ' +
                        'neque volutpat ac tincidunt vitae. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. ' +
                        'Consectetur libero id faucibus nisl. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Semper eget duis' +
                        ' at tellus. Id neque aliquam vestibulum morbi blandit. Non tellus orci ac auctor augue mauris. Amet dictum sit amet ' +
                        'justo. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Netus et malesuada fames ac. Porttitor rhoncus ' +
                        'dolor purus non enim praesent elementum facilisis. Faucibus ornare suspendisse sed nisi lacus. Accumsan lacus vel ' +
                        'facilisis volutpat est velit egestas. Massa enim nec dui nunc mattis enim ut tellus. Id nibh tortor id aliquet lectus ' +
                        'proin nibh nisl. Amet volutpat consequat mauris nunc. Ipsum nunc aliquet bibendum enim facilisis gravida.' +
                        'Cursus euismod quis viverra nibh cras pulvinar mattis. In fermentum posuere urna nec tincidunt. Fringilla ut morbi ' +
                        'tincidunt augue interdum velit euismod in. Hac habitasse platea dictumst quisque sagittis purus sit amet. In mollis ' +
                        'nunc sed id semper risus in. Dui accumsan sit amet nulla facilisi morbi tempus. Diam sollicitudin tempor id eu nisl ' +
                        'nunc mi ipsum. Ipsum faucibus vitae aliquet nec ullamcorper. Volutpat odio facilisis mauris sit amet. Fermentum leo ' +
                        'vel orci porta non pulvinar neque laoreet. Elementum nisi quis eleifend quam. Commodo ullamcorper a lacus vestibulum ' +
                        'sed arcu non odio. Quam id leo in vitae turpis massa sed elementum tempus. Odio ut sem nulla pharetra diam sit.',
                    signature: {
                        signerFullName: "Signer's Full Name",
                        typeItText: 'Type It',
                        signItText: 'Sign It',
                        typeItPreviewText: 'Signature Preview',
                        signItPreviewText: 'Signature Box',
                        signItInstruction: 'Use a mouse or stylus to sign in the signature box above.',
                        clearText: 'Clear'
                    },
                    actions: {
                        submitBtn: 'Continue'
                    }
                },
                confirmation: {
                    header: 'Confirmation',
                    description:
                        'Thank you for your response. The NovoCare® team will review the information and notify you regarding next steps.',
                    description1:
                        'Thank you for your response. <br/> The NovoCare® team will <br/> review the information and <br/> notify you regarding next steps.',
                    homeLink: 'SUBMIT FOR ANOTHER PATIENT',
                    homeLinkUrl: 'https://products.sanofi.us/',
                    enrollmentHeader: 'What’s Next?',
                    enrollmentDescription:
                        '<p>You’re almost there! Review the information on the right to see what comes next. Read carefully, as there may be steps needed from your office and/or the patient.</p>' +
                        '<p>Upon review of the information submitted, XTANDI Support Solutions will contact you within 2-5 business days.</p>' +
                        '<p>As always, please reach out to us with any questions!</p>',
                    uploadDocumentHeader: 'Thank You!',
                    uploadDocumentDescription:
                        '<p>Upon review of the information submitted, XTANDI Support Solutions will contact you within 2-5 business days.</p>' +
                        '<p>As always, please reach out to us with any questions!</p>',
                    patientAuthorizationHeader: 'Thank You!',
                    patientAuthorizationDescription:
                        '<p>Upon review of the information submitted, XTANDI Support Solutions will contact you within 2-5 business days.</p>' +
                        '<p>As always, please reach out to us with any questions!</p>',
                    registerLabel: 'Register with iAssist',
                    checkOtherLabel: 'Check other patients coverage',
                    checkAnotherLabel: 'ENROLL ANOTHER PATIENT',
                    needFurtherAssistanceLabel: 'Need Further Assistance?',
                    needAssistanceLabel: 'Need Assistance?',
                    footer: `Contact Alongside {0} at 800-{1}`,
                    enrollmentDownloadLabel:
                        '<p><span class="confirmation-note-bold">XTANDI Support Solutions will provide</span> a detailed Benefits Verification Summary that includes contact information for the in-network specialty pharmacy processing your patient’s prescription.</p>' +
                        '<p><span class="confirmation-note-bold">If you are seeking to enroll your XTANDI<sup>®</sup> (enzalutamide) patient in the Astellas Patient Assistance Program (PAP),</span> please submit a valid electronic prescription for XTANDI to: </p>' +
                        '<div class="addressPharmacy" style="text-align: center;">' +
                        '    <div class="confirmation-address" style="display: inline-block; text-align: left;">' +
                        '        <span class="confirmation-address-bold">ARX Patient Solutions Pharmacy</span><br />' +
                        '        4500 W. 107th Street<br />' +
                        '        Overland Park, KS 66207<br />' +
                        '        <span class="confirmation-address-bold"><i>[NCPDP: 1720677]</i></span><br />' +
                        '    </div>' +
                        '</div>' +
                        '<p><span class="confirmation-note-bold">TIP:</span> Inform your patient that XTANDI Support Solutions may reach out for additional information or to provide status updates.</p>' +
                        '<p><span class="confirmation-note-bold">To download a copy of the completed Enrollment Form for your records,</span> select the document below and click “Download”.</p>',
                    uploadDocumentDownloadLabel: 'If you wish to download a copy of your completed form, click the check box below and then click "Download"',
                    patientAuthorizationDownloadLabel:
                        '<p><span class="confirmation-note-bold">To download a copy of the completed document for your records, select the document below and click “Download”.</span></p>',
                    patientAuthorizationLabel: 'Patient Authorization Form',
                    enrollmentLabel: 'Enrollment Form ',
                    downloadLabel: 'If you wish to download a copy of your completed form, click the check box below and then click "Download"',
                    enrollment: 'Enrollment Form',
                    priorAuthorization: 'Prior Authorization',
                    downloadBtnLabel: 'Download'
                },
                availableServices: {
                    step: {
                        header: "Services Selection",
                        description:
                            'CareASSIST can offer help with providing information on financial assistance options, navigating potential access challenges, and identifying additional resources to help eligible patients manage their care.',
                        back: 'Previous Step'
                    },
                    serviceType: {
                        label: 'Support Services requested?* (Select all that apply)',
                        description: '*A benefits investigation is automatically conducted as an initial step in the enrollment process once the enrollment form is completed in order to determine patient coverage and eligibility for services.',
                        options: [
                            // Grouping medications to select into 5 count to reduce the clutter
                            // As per figma modeling
                                {
                                    displayedString: 'Prior authorization assistance',
                                    valueString: ServiceOfferingsEnum.PriorAuthorizationAssistance,
                                    subdescription: ''
                                },
                                {
                                    displayedString: 'Claims/appeals assistance',
                                    valueString: ServiceOfferingsEnum.ClaimsAppealsAssistance,
                                    subdescription: ''
                                },
                                {
                                    displayedString: 'CareASSIST Copay Program',
                                    valueString: ServiceOfferingsEnum.CareAssistCopayProgram,
                                    serviceTitle: '',
                                    subdescription: ''
                                },
                                {
                                    displayedString: 'CareASSIST Patient Assistance Program (PAP)',
                                    valueString: ServiceOfferingsEnum.CareAssistPatientAssistanceProgram,
                                    serviceTitle: '',
                                    subdescription: ''
                                },
                                {
                                    displayedString: 'Resource Support',
                                    valueString: ServiceOfferingsEnum.ResourceSupport,
                                    serviceTitle: '',
                                    subdescription: ''
                                }
                        ]
                    },
                    pleaseContinue: '<i>Please click “Continue” to provide the selected information for your <span class="myway">DUPIXENT MyWay</span> enrollment.</i>',
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                prescriberNPIView: {
                    step: {
                        header: 'Prescriber Search',
                        description: 'Please enter the National Prescriber Identifier (NPI) to search for the prescribing provider.',
                        descriptionline2: 'Please enter the prescriber first and last name or National Prescriber Identifier (NPI) to search for the prescribing provider.',

                        back: 'Previous Step'
                    },
                    body: {
                        pageHeader: 'Prescriber NPI',
                        textBoxPlaceholder: 'Input the prescriber NPI# here',
                        npiValidation: 'Select a prescriber below or',
                        npiSearchAgain: 'search again',
                        nonRegisteredNPI: 'Is this the provider you would like to register?',
                        registeredNPI: 'Select a prescriber below, search again or select the “Skip This Step” button below to manually type in Prescriber Information on the next page.',
                        prescriberNameLink: 'Search by Prescriber Name and Zip Code',
                        prescriberTextLink: 'Don’t have NPI Number,',
                        prescriberNpiTextLink: 'Search by Prescriber NPI Number'
                    },
                    info:{
                        firstName:'Prescriber First Name',
                        firstNameTextBoxPlaceholder: 'Input prescriber\'s first name',
                        lastName:'Prescriber Last Name',
                        lastNameTextBoxPlaceholder: 'Input prescriber\'s last name',
                        zip:'Zip Code',
                        zipTextBoxPlaceholder: 'Input ZIP',
                    },
                    marketingConsent: {
                        label: 'Agree to receive marketing campaigns.',
                        option: [
                            {
                                valueString: 'a',
                                displayedString: 'Agree to receive marketing campaigns.'
                            }
                        ]
                    },
                    cancelModal: {
                        title: 'Hold On!',
                        content:
                            '<p>In order to look up patient insurance and conduct an Astellas Patient Assistance Program (PAP) assessment, prescriber validation is required.<p>' +
                            '<p>If you choose to skip prescriber validation, you can still continue to submit patient information electronically for the XTANDI Support Solutions enrollment form. Benefits verification will not be available real-time; however, XTANDI Support Solutions can instead manually assess the patient information after submission. Are you sure you want to skip prescriber verification? ',
                        yesLeave: 'Yes, Continue',
                        noContinue: 'No, Go Back'
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Skip this Step',
                        skipLink: 'Skip This Step'
                    }
                },
                prescriberEmailSearch: {
                    emailUnregistered:
                        'This email is either incorrect or is not recognized in our system. Please re-enter or choose to authenticate this NPI again by answering a few questions here: ',
                    kbaAuthenticationLinkText: 'KBA Authentication.'
                },
                prescriberNewNPI: {
                    step: {
                        header: 'Prescriber Information',
                        description: 'Please complete the verification steps.',
                        back: 'Previous Step'
                    }
                },
                cancelModal: {
                    title: 'Hold On!',
                    content:
                        'If you leave now, you will lose all the previous information you have entered. Are you sure you want to leave?',
                    yesLeave: 'Yes, leave',
                    noContinue: 'No, continue'
                },
                prescriberEmail: {
                    step: {
                        header: 'Prescriber Email',
                        description: 'Please enter the email address linked to this provider registration.',
                        requiredText: 'Important Safety Information',
                        back: 'Previous Step'
                    },
                    body: {
                        description: 'Please enter the email address that was linked to this provider registration.',
                        email: 'Email',
                        emailPlaceholder: 'Input your email in here',
                        emailUnregistered:
                            '<span>This email is either incorrect or not recognized by our system.</span>' +
                            '<span class="email-unregistered-error">Please re-enter the email associated with the NPI linked to the provider registration or choose to authenticate this NPI again with ' +
                            'a new email address by clicking “Continue” to answer a few questions.</span>'
                    },
                    actions: {
                        continueButton: 'Continue',
                        cancelButton: 'Cancel',
                        skipLink: 'Skip'
                    }
                },
                productSelection: {
                    step: {
                        header: 'Medication Selection',
                        description:
                            'We understand not every patient’s situation is the same. In order to help best meet your patient’s needs, please select their prescribed Sanofi medication.',
                        back: 'Previous Step',
                    },
                    productType: {
                        label: 'Please select your patient’s prescribed medication below.',
                        optionalText: 'aasdasd',
                        options: [
                            [
                                {
                                    displayedString: `ELITEK® (rasburicase) <div class="radio-second-line">Please see full <a target="_blank" href = https://products.sanofi.us/elitek/elitek.html>Prescribing Information</a>, including Boxed WARNING</div>`,
                                    valueString: 'Elitek'
                                },
                                {
                                    displayedString: 'JEVTANA® (cabazitaxel) injection <div class="radio-second-line">Please see full <a target="_blank" href = https://products.sanofi.us/jevtana/jevtana.html>Prescribing Information</a>, including Boxed WARNING</div>',
                                    valueString: 'Jevtana'
                                },
                                {
                                    displayedString: 'SARCLISA® (isatuximab-irfc) <div class="radio-second-line">Please see full <a target="_blank" href =https://products.sanofi.us/Sarclisa/sarclisa.pdf>Prescribing Information</a></div>',
                                    valueString: 'Sarclisa'
                                }
                            ]
                        ]
                    },
                    diagnosisCodes: {
                        label: 'Diagnosis Code',
                        option: [
                            { valueString: 'C61', displayedString: 'C61 [Malignant Neoplasm of Prostate]' },
                            { valueString: 'Z85.46', displayedString: 'Z85.46 [Personal History of Malignant Neoplasm of Prostate]' },
                            { valueString: 'Z19.1', displayedString: 'Z19.1 [Hormone Sensitive Malignancy status]' },
                            { valueString: 'Z19.2', displayedString: 'Z19.2 [Hormone Resistant Malignancy status]' },
                            { valueString: 'Other', displayedString: 'Other' }
                        ]
                    },
                    diagnosisIfOther: 'Diagnosis Code if “Other”',
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                providerAttestationView: {
                    step: {
                        header: 'Provider Attestation',
                        description: 'Please provide attestation to continue.',
                        requiredText: 'Important Safety Information',
                        back: 'Previous Step'
                    },
                    attestationForm: {
                        label: 'Provider Attestation',
                        option: [
                            {
                                valueString: 'a',
                                displayedString: 'I agree'
                            }
                        ]
                    },
                    attestationFormContentGilenya:
                        'I certify that the above therapy is medically necessary and that the information provided ' +
                        'is accurate to the best of my knowledge. I certify that I am the prescriber who has prescribed GILENYA to the previously ' +
                        'identified patient. I have discussed the GILENYA Support Program with my patient, who has authorized me under HIPAA and ' +
                        'state law to disclose their information to Novartis for the limited purpose of enrolling in the GILENYA Support Program. ' +
                        'To complete this enrollment, Novartis may contact the patient by phone, text and/or email. I also agree to receive communications, ' +
                        'including faxes, related to my patient’s enrollment or participation in the GILENYA Support Program.',
                    attestationFormContentMayzent:
                        'I certify that the above therapy is medically necessary and that the information provided is ' +
                        'accurate to the best of my knowledge. I certify that I am the prescriber who has prescribed MAYZENT to the previously identified ' +
                        'patient. I have discussed the MAYZENT Support Program with my patient, who has authorized me under HIPAA and state law to disclose  ' +
                        'their information to Novartis for the limited purpose of enrolling in the MAYZENT Support Program. To complete this enrollment, ' +
                        'Novartis may contact the patient by phone, text and/or email. I also agree to receive communications, including faxes, related to ' +
                        'my patient’s enrollment or participation in the MAYZENT Support Program.',
                    signature: {
                        signerFullName: "Signer's Full Name",
                        typeItText: 'Type Signature',
                        signItText: 'Sign Signature',
                        typeItPreviewText: 'Signature Preview',
                        signItPreviewText: 'Signature Box',
                        signItInstruction: 'Use a mouse or stylus to sign in the signature box above.',
                        clearText: 'Clear'
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                patientDemographics: {
                    step: {
                        header: 'WELCOME!',
                        description: `Additional information is needed from you in order to complete your NovoCare® enrollment.
                          To get started please provide the following patient information.`,
                        requiredText: '',
                        back: ''
                    },
                    body: {
                        header: 'PATIENT INFORMATION',
                        subheader: 'Please provide the following patient information.',
                        caregiverHeader: 'PRIMARY CAREGIVER INFORMATION',
                        caregiverSubheader: 'Please provide the following primary caregiver contact information to the extent applicable.',
                        firstName: 'First Name',
                        firstNamePlaceholder: 'Input patient first name here',
                        lastName: 'Last Name',
                        lastNamePlaceholder: 'Input patient last name here',
                        dob: 'Date of Birth',
                        dobPlaceholder: 'MM/DD/YYYY',
                        postalCode: 'Zip Code',
                        postalCodePlaceholder: 'Input patient zip code here',
                        patientPhone: 'Patient Phone',
                        patientPhonePlaceholder: '_ _ _-_ _ _-_ _ _ _',
                        caregiverFirstName: 'Primary Caregiver First Name',
                        caregiverFirstNamePlaceholder: `Input caregiver first name here`,
                        caregiverLastName: 'Primary Caregiver Last Name',
                        caregiverLastNamePlaceholder: `Input caregiver last name here`,
                        caregiverPhone: 'Primary Caregiver Phone',
                        caregiverPhonePlaceholder: `_ _ _-_ _ _-_ _ _ _`,
                        caregiverRelationshipToPatient: {
                            label: 'Relationship to Patient',
                            option: [
                                { valueString: 'Family Member', displayedString: 'Family Member' },
                                { valueString: 'Caregiver', displayedString: 'Caregiver' },
                                { valueString: 'Spouse', displayedString: 'Spouse' },
                                { valueString: 'Other', displayedString: 'Other' }
                            ],
                            dropdownPlaceHolder: 'Select one'
                        },
                        sex: {
                            label: 'Gender',
                            option: [
                                {
                                    valueString: 'M',
                                    displayedString: 'Male'
                                },
                                {
                                    valueString: 'F',
                                    displayedString: 'Female'
                                }
                            ]
                        },
                        demographicsInformation: `Enrollment is intended for individuals 18 years of age or older.
                            Any information collected on behalf of patients under 18 years of age must be provided by a legally authorized
                            caregiver and not from a minor themselves.`,
                        below18Information: `Based on the patient date of birth provided, this patient is under 18 years of age.
                            These fields are now required.`
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                pricingBenefit: {
                    step: {
                        header: 'Pricing Benefits',
                        description: 'Please continue through the steps to complete the coverage check.',
                        requiredText: 'Important Safety Information',
                        supportSubtitle: 'Additional Support Options',
                        supportDescription:
                            'Alongside MS is committed to providing the right support, right when your patients need it. We’ll adapt to your process and your schedule so you and your patients have clarity and know what to expect.',
                        supportLink: 'Co-pay Coverage',
                        supportSubDescription: 'Please unlock the patient’s coverage to understand if they qualify for this program.'
                    },
                    body: {
                        uploadDoc: {
                            uploadLabel: 'Would you like to upload any supporting documentation (Insurance cards or clinical notes)?',
                            documentHeader: 'Uploaded Documents:',
                            documentTypeId: DocumentType.UploadedFileInsurance,
                            documentDescriptor: 'Uploaded File (Insurance)',
                            deleteButton: 'Delete',
                            previewButton: 'Preview',
                            uploadButtonText: 'Upload Documents'
                        }
                    },
                    actions: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                chat: {
                    header: 'Now Chatting',
                    online: 'Need help?',
                    offline: 'Live Chat Offline'
                },
                needAssistance: {
                    title: 'Need Assistance?',
                    body: `Call $needAssistancePhoneNumber to contact NovoCare® Team <br> ${needAssistanceOfficeSchedule}`,
                    needAssistancePhoneNumberRb: '1-844-668-6732',
                    needAssistancePhoneNumberObes: '1-888-809-3942',
                    needAssistancePhoneNumberGrowth: '1-888-668-6444',
                    needAssistancePhoneNumberDefault: '1-833-885-3146',
                    footer: ''
                },
                snackbar: {
                    formError: 'Sorry, one or more of the required field(s) are not valid.',
                    patientNotFound:
                        'Our search did not find insurance information for this patient. Please click “OK” to continue and provide further information.',
                    prescriberSearchNotFound: 'Sorry, no results were found. Please check your information and try again.',
                },
                documentUpload: {
                    step: {
                        header: 'Document Upload',
                        subHeader: '',
                        description:
                            'Next, please upload the requested documentation here. If you are not sure which documentation to upload, please call NovoCare® team to speak with a case manager.',
                        requiredText:
                            '<i>Please note:<text-required><span class="text-required"> All fields denoted with an asterisk (<span class="required">*</span>) are required.</span></i>',
                        back: 'Previous Step'
                    },
                    actions: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel',
                        skipBtn: 'Skip step'
                    },
                    uploadDoc: {
                        uploadLabel:
                        {
                          label: 'Need to upload supporting documentation?',
                          tooltip: `Proof of Income may include: \n Pay Stubs (2 most current) \n Most recent year\'s tax return (1040) \n Copy of income documents \n Most recent W-2 or 1099 \n Unemployment Benefit Statement \n\n Coverage Denial Letters may \n include: letter from Medicaid, VA, \n Medicare Extra Help, etc.`
                        },
                        description: '<span>Please upload any supporting information that has been requested, such as: insurance cards, proof of income or coverage denial letters.</span>',
                        description2: '<span>Please upload any supporting information <br> that has been requested, such as: insurance <br> cards, proof of income or coverage <br> denial letters.</span>',
                        description1: 'Do not include medical records',
                        restrictions: 'Files must be 20MB or less and in JPG, PNG or PDF format.',
                        documentHeader: 'Upload',
                        documentTypeId: DocumentType.UploadedFile,
                        documentDescriptor: 'Uploaded File',
                        deleteButton: 'Delete',
                        previewButton: 'Preview',
                        uploadButtonText: 'Upload',
                        fileSize: '(Files must be 20MB or less and in JPG, PNG, or PDF format)',
                        important: '<span>IMPORTANT: The security and protection of your personal financial information is very important to us. <br/><br/> Financial documents are stored securely in our system and, for your protection, <br/> we encourage you to black out any references to Social Security numbers, full or <br/> partial, in any documents supplied.</span>',
                        importantTablet: '<span>IMPORTANT: The security and protection of your personal financial information is very important to us. <br/><br/> Financial documents are stored securely in our system and, for your protection, we encourage you to black out any references to Social Security numbers, full or partial, in any documents supplied.</span>',
                        importantMobile: '<span>IMPORTANT: The security and <br/> protection of your personal financial <br/> information is very important to us. <br/><br/> Financial documents are stored securely <br/> in our system and, for your protection, <br/> we encourage you to black out any <br/> references to Social Security numbers, <br/> full or partial, in any documents <br/> supplied.</span>',
                        required: 'required',
                        restrictionsError: 'Document upload failed (file size cannot exceed 20MB and must be type JPG, PNG, or PDF format)'
                    },
                    dropdownPlaceholder: 'Select One',
                    documentType: {
                        label: 'Please indicate the type of document you are uploading.',
                        option: [
                            {
                                valueString: 'Supplemental Income/Tax Documentation ',
                                displayedString: 'Supplemental Income/Tax Documentation '
                            },
                            {
                                valueString: 'Formal Medicare Extra Help Denial Letter for PAP Applicants',
                                displayedString: 'Formal Medicare Extra Help Denial Letter for PAP Applicants'
                            },
                            { valueString: 'Asset Screening Questionnaire', displayedString: 'Asset Screening Questionnaire' },
                            { valueString: 'Insurance Card(s)', displayedString: 'Insurance Card(s)' },
                            {
                                valueString: 'Insurance Documentation (ex Prior Authorization or Appeal Denial Letter)',
                                displayedString: 'Insurance Documentation (ex Prior Authorization or Appeal Denial Letter)'
                            },
                            { valueString: 'Other', displayedString: 'Other' }
                        ],
                        tooltip:
                            'Select “Supplemental Income/Tax Documentation” when uploading: Statement of Household Size, SSDI/SSI Award Letter, State Program Acceptance Letter or Card, 1099 Social Security Form, or Latest Federal Tax Return, State Tax Return or W-2 Statement, Bank Statement (1 Month), Pay Stub(s) (1 Month), or Signed Letter Stating Patient Has No Income.'
                    },
                    documentTypeOther: 'Please provide type of document'
                },
                bifoldLayout: {
                    prescribingInformationLinkText: 'Prescribing Information',
                    prescribingInformationLinkUrl: 'https://www.avadel.com/assets/docs/lumryz-prescribing-information.pdf',
                    prescribingInformationDescription: '(Including BOXED Warning)',
                    importantSafetyInformationLinkText: 'Important Safety Information',
                    importantSafetyInformationLinkUrl: 'http://www.lumryzhcp.com/'
                },
                insuranceInformation: {
                    step: {
                        header: 'Insurance Information',
                        description:
                            `Please provide the following information to continue the patient’s enrollment.`,
                        requiredText:
                            `<i>Please note:<text-required><span class="text-required">` +
                            ` All fields denoted with an asterisk (<span class="required">*</span>) are required.</span></i>`,
                        back: 'Previous Step'
                    },
                    static: {
                        completeMessage:
                            'Click "Continue" to complete application for this patient.',
                        noInsuranceError:
                            'Our search did not find insurance information for this patient. Please click “OK” to continue and provide further information.',
                        unableToFindInsurance: 'We were unable to find Insurance Information for this patient.',
                        foundInsuranceMessage: 'Looks like we found Insurance Information for this patient.',
                        insuranceInfoText: 'Pharmacy Insurance Info',
                        viewInfoText: 'View Info',
                        uploadedDocs: {
                            uploadLabel: `Please upload the front and back images of any relevant Pharmacy Insurance card(s):`,
                            uploadLabelInsurance: `Please upload any relevant insurance card(s):`,
                            description: '',
                            restrictions: 'Files must be 20MB or less and in JPG, PNG or PDF format.',
                            documentHeader: 'Upload',
                            documentTypeId: DocumentType.UploadedFileInsurance,
                            documentDescriptor: 'Uploaded File (Insurance)',
                            deleteButton: 'Delete',
                            previewButton: 'Preview',
                            uploadButtonText: 'Upload',
                            fileSize: 'Files must be 20MB or less and in JPG, PNG, or PDF format',
                            required: null
                        },
                        uploadedDocsInsurance: {
                            uploadLabel: `Please upload any relevant insurance card(s):`,
                            description: 'Upload any supporting documents, such as paystubs or tax returns.',
                            restrictions: 'Files must be 20MB or less and in JPG, PNG or PDF format.',
                            documentHeader: 'Upload',
                            documentTypeId: DocumentType.UploadedFileInsurance,
                            documentDescriptor: 'Uploaded File (Insurance)',
                            deleteButton: 'Delete',
                            previewButton: 'Preview',
                            uploadButtonText: 'Upload',
                            fileSize: '(Files must be 20MB or less and in JPG, PNG, or PDF format)',
                            required: null
                        },
                        viewInsuranceModal: {
                            viewInsuranceTitle: 'Insurance Information',
                            insurancePlanType: 'Insurance Type',
                            pbmName: 'Insurance Name',
                            placeholderPbmName: 'Input insurance name in here',
                            pbmPhone: 'Insurance Phone Number',
                            placeholderPbmPhone: 'Input insurance phone number in here',
                            policyIDNumber: 'Policy Number',
                            placeholderPolicyIDNumber: 'Input policy number in here',
                            groupNumber: 'Group Number',
                            placeholderGroupNumber: 'Input group number in here',
                            binNumber: 'BIN Number',
                            pcnNumber: 'PCN Number',
                            policyholderRelationshipToPatient: 'Relationship to Patient',
                            policyholderDateOfBirth: 'Policyholder Date of Birth',
                            policyholderFirstName: 'Policyholder First Name',
                            placeholderPolicyholderFirstName: 'Input first name in here',
                            policyholderLastName: 'Policyholder Last Name',
                            placeholderPolicyholderLastName: 'Input last name in here',
                        }
                    },
                    isInformationCorrect: {
                        label: 'Is this information correct?',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    hasInsurance: {
                        label: 'Does the patient have insurance?',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    wantToUpload: {
                        label: 'Would you like to upload an image of the insurance card(s)?',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    form: {
                        insurancePlanType: {
                            label: 'Insurance Type',
                            option: [
                                { valueString: 'medical', displayedString: 'Medical' },
                                { valueString: 'pharmacy', displayedString: 'Pharmacy' }
                            ],
                            dropdownPlaceHolder: 'Select one'
                        },
                        pbmName: 'Insurance Name',
                        placeholderPbmName: 'Input insurance name in here',
                        pbmPhoneNumber: 'Insurance Phone Number',
                        placeholderPbmPhoneNumber: 'Input insurance phone number in here',
                        policyIdNumber: 'Policy Number',
                        placeholderPolicyIDNumber: 'Input policy number in here',
                        groupNumber: 'Group Number',
                        placeholderGroupNumber: 'Input group number in here',
                        binNumber: 'BIN Number',
                        pcnNumber: 'PCN Number',
                        policyholderRelationshipToPatient: {
                            label: 'Relationship to Policyholder',
                            option: [
                                { valueString: 'self', displayedString: 'Self' },
                                { valueString: 'spouse', displayedString: 'Spouse' },
                                { valueString: 'parent', displayedString: 'Parent' },
                                { valueString: 'child', displayedString: 'Child' },
                                { valueString: 'unknown', displayedString: 'Unknown' },
                                { valueString: 'otherRelationship', displayedString: 'Other Relationship' }
                            ],
                            dropdownPlaceHolder: 'Select one'
                        },
                        policyholderDateOfBirth: 'Policyholder Date of Birth',
                        policyholderFirstName: 'Policyholder First Name',
                        placeholderPolicyholderFirstName: 'Input first name in here',
                        policyholderLastName: 'Policyholder Last Name',
                        placeholderPolicyholderLastName: 'Input last name in here',
                        view: {
                            header:
                                'If your patient has a Pharmacy Insurance plan other than what is listed above, ' +
                                'please enter the plan information below.'
                        }
                    },
                    hasSecondaryInsurance: {
                        label: 'Does the patient have any other insurance?',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                            { valueString: 'N', displayedString: 'No' },
                            { valueString: 'U', displayedString: 'Unknown' },
                        ]
                    },
                    actions: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                patientAuthorization: {
                    snackbarErrorForConsent: 'Sorry, one or more of the required field(s) are missing.',
                    snackbarErrorPattern: 'Sorry, one or more of the required fields(s) are not valid',
                    snackbarErrorField: 'Sorry, one or more of the required field(s) are missing.',
                    snackbarErrorScroll: `Sorry, the authorization box must be read by scrolling to the bottom of the box
                      before selecting any of the checkboxes.`,
                    snackbarErrorDocumentUpload: `Document upload failed
                      (file size cannot exceed 20MB and must be in JPG, PNG, or PDF format)`,
                    dropdownPlaceholder: 'Select One',
                    step: {
                        header: 'Patient Authorization',
                        subHeader: '',
                        description:
                            'Next, please provide consent to continue. If the patient is under the age of 18, a parent or legal representative must provide consent.',
                        requiredText:
                            '',
                        back: 'Previous Step'
                    },
                    isPresent: {
                        label: 'Is the patient or legal representative present to authorize?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' },
                        ]
                    },
                    authorizationOption: {
                        label: 'What do you want to do today?',
                        option: [
                            { valueString: 'PAuth', displayedString: 'Provide Novocare® Program Authorization' },
                            { valueString: 'PAP', displayedString: 'Provide Patient Assistance Program (PAP) Authorization' },
                            { valueString: 'Both', displayedString: 'Provide both Novocare® Program and Patient Assistance Program Authorization' },
                        ]
                    },
                    patientOrRepresentativeEmail: 'Patient or Legal Representative Email',
                    provideText:
                        'Please provide the patient’s or legal representative’s email address. An email will be sent with a link that will allow the patient or legal representative to provide consent online.',
                    skipContinueText:
                        'Click “Continue” to complete enrollment for this patient. XTANDI Support Solutions will review records for provided consent and contact you and your patient with any questions.',
                    emailContinue:
                        'Once the email address has been entered below, click “Continue” to send the email and to move on to the next step to complete enrollment.',
                    whoIsAuthorizing: {
                        label: 'Who is authorizing?',
                        option: [
                            { valueString: 'Patient', displayedString: 'Patient' },
                            { valueString: 'Legal Representative', displayedString: 'Legal Representative' }
                        ]
                    },
                    legalDiscloser:
                        `If signed by someone other than the patient, please describe your legal authority/power of attorney to sign on behalf of the patient (e.g. parent, guardian, custodian, healthcare power of attorney). Please note that if you are the patient's prescriber, that alone does not give you legal authority to sign on behalf of the patient.`,
                    legalRepFullName: 'Legal Representative First and Last Name',
                    relationToPatient: {
                        label: 'Relationship to Patient',
                        option: [
                            { valueString: 'AltContact', displayedString: 'Alternate Contact' },
                            { valueString: 'Caretaker', displayedString: 'Caretaker' },
                            { valueString: 'PowerOfAttorney', displayedString: 'Power of Attorney' },
                        ]
                    },
                    hipaaConsent:{
                        label:'NovoCare® Program and HIPAA Authorization',
                        options: [
                            {
                                valueString: 'hipaa',
                                displayedString:
                                    'I agree to the NovoCare® Program and HIPAA Authorization Statement'
                            }
                        ],
                        rareBloodContent:`I (or my parent/guardian/legal representative) hereby give permission for my (or the patient’s) health care providers, pharmacies, service providers and their contractors, health plans, and health insurer(s) and their contractors, to disclose any and all necessary information, including, but not limited to, prescription coverage, medical prescriptions, medical condition, and health records (“Personal Information”) to Novo Nordisk’s NovoCare®. I also give permission for NovoCare to contact me regarding the program. <br> <br>
                        This Personal Information aids in administering the program "NovoCare®" by: (i) processing this Application; (ii) verifying my information; (iii) identifying and/or determining eligibility under NovoCare® and other patient assistance resources; (iv) investigating and verifying my insurance benefits; (v) coordinating the dispensing and delivery of medication; (vi) conducting additional services to run NovoCare® ; and (vii) conducting quality assurance and/or other internal business activities in connection with NovoCare® . <br> <br>
                        I (or my parent/guardian/legal representative) further give permission to NovoCare® to use and disclose my (or the patient’s) Personal Information to Health Care Providers, Insurer(s), caregivers, Novo Nordisk, its affiliates, service providers, and agents (collectively “Novo Nordisk”), for the purposes described above. <br> <br>
                        I (or my parent/guardian/legal representative) understand and acknowledge that while NovoCare®, Novo Nordisk, and any authorized contractors acting on their behalf will make every effort to keep Personal Information private, once Personal Information is disclosed it may no longer be protected by federal privacy and security laws or applicable state laws. Specifically, I (or my parent/guardian/legal representative) acknowledge that once disclosed, Personal Information may be legally re-disclosed by authorized recipients unless otherwise prohibited by law. <br> <br>
                        I (or my parent/guardian/legal representative) understand that this authorization may be refused. I (or my parent/guardian/legal representative) may also revoke (withdraw) this NovoCare® authorization at any time in the future by calling 1-844-668-6732 or writing to NovoCare® 501 W. Church St. #405, Orlando,FL 32805. Such refusal or future revocation will not affect my (or the patient’s) commencement or continuation of treatment by healthcare providers, pharmacies, service providers, insurer(s), etc. However, if I (or my parent/guardian/legal representative) revoke this authorization, there can be no further participation in the programs and/or services administered by NovoCare®. <br> <br>
                        If I (or my parent/guardian/legal representative) revoke this authorization, NovoCare® will stop using or sharing my (or the patient’s) Personal Information (except as necessary to end participation) but such revocation will not affect uses and disclosures of Personal Information previously disclosed in reliance upon this authorization. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may receive a copy of this authorization which will remain valid for so long as necessary to facilitate the NovoCare® Program unless a shorter time period is required by federal or state law. I (or my parent/guardian/legal representative) also understand that NovoCare® may change or end at any time without prior notification.`,
                        obesityContent:`I (or my parent/guardian/legal representative) hereby give permission for my (or the patient’s) health care providers, pharmacies, service providers and their contractors, health plans, and health insurer(s) and their contractors, to disclose any and all necessary information, including, but not limited to, prescription coverage, medical prescriptions, medical condition, and health records (“Personal Information”) to Novo Nordisk’s NovoCare®. I also give permission for NovoCare to contact me regarding the program. <br> <br>
                        This Personal Information aids in administering the program "NovoCare®" by: (i) processing this Application; (ii) verifying my information; (iii) identifying and/or determining eligibility under NovoCare® and other patient assistance resources; (iv) investigating and verifying my insurance benefits; (v) coordinating the dispensing and delivery of medication; (vi) conducting additional services to run NovoCare® ; and (vii) conducting quality assurance and/or other internal business activities in connection with NovoCare® . <br> <br>
                        I (or my parent/guardian/legal representative) further give permission to NovoCare® to use and disclose my (or the patient’s) Personal Information to Health Care Providers, Insurer(s), caregivers, Novo Nordisk, its affiliates, service providers, and agents (collectively “Novo Nordisk”), for the purposes described above. <br> <br>
                        I (or my parent/guardian/legal representative) understand and acknowledge that while NovoCare®, Novo Nordisk, and any authorized contractors acting on their behalf will make every effort to keep Personal Information private, once Personal Information is disclosed it may no longer be protected by federal privacy and security laws or applicable state laws. Specifically, I (or my parent/guardian/legal representative) acknowledge that once disclosed, Personal Information may be legally re-disclosed by authorized recipients unless otherwise prohibited by law. <br> <br>
                        I (or my parent/guardian/legal representative) understand that this authorization may be refused. I (or my parent/guardian/legal representative) may also revoke (withdraw) this NovoCare® authorization at any time in the future by calling 1-888-809-3942 or writing to NovoCare® 501 W. Church St. #405, Orlando,FL 32805. Such refusal or future revocation will not affect my (or the patient’s) commencement or continuation of treatment by healthcare providers, pharmacies, service providers, insurer(s), etc. However, if I (or my parent/guardian/legal representative) revoke this authorization, there can be no further participation in the programs and/or services administered by NovoCare®. <br> <br>
                        If I (or my parent/guardian/legal representative) revoke this authorization, NovoCare® will stop using or sharing my (or the patient’s) Personal Information (except as necessary to end participation) but such revocation will not affect uses and disclosures of Personal Information previously disclosed in reliance upon this authorization. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may receive a copy of this authorization which will remain valid for so long as necessary to facilitate the NovoCare® Program unless a shorter time period is required by federal or state law. I (or my parent/guardian/legal representative) also understand that NovoCare® may change or end at any time without prior notification.`,
                        growthContent:`I (or my parent/guardian/legal representative) hereby give permission for my (or the patient’s) health care providers, pharmacies, service providers and their contractors, health plans, and health insurer(s) and their contractors, to disclose any and all necessary information, including, but not limited to, prescription coverage, medical prescriptions, medical condition, and health records (“Personal Information”) to Novo Nordisk’s NovoCare®. I also give permission for NovoCare to contact me regarding the program. <br> <br>
                        This Personal Information aids in administering the program "NovoCare®" by: (i) processing this Application; (ii) verifying my information; (iii) identifying and/or determining eligibility under NovoCare® and other patient assistance resources; (iv) investigating and verifying my insurance benefits; (v) coordinating the dispensing and delivery of medication; (vi) conducting additional services to run NovoCare® ; and (vii) conducting quality assurance and/or other internal business activities in connection with NovoCare® . <br> <br>
                        I (or my parent/guardian/legal representative) further give permission to NovoCare® to use and disclose my (or the patient’s) Personal Information to Health Care Providers, Insurer(s), caregivers, Novo Nordisk, its affiliates, service providers, and agents (collectively “Novo Nordisk”), for the purposes described above. <br> <br>
                        I (or my parent/guardian/legal representative) understand and acknowledge that while NovoCare®, Novo Nordisk, and any authorized contractors acting on their behalf will make every effort to keep Personal Information private, once Personal Information is disclosed it may no longer be protected by federal privacy and security laws or applicable state laws. Specifically, I (or my parent/guardian/legal representative) acknowledge that once disclosed, Personal Information may be legally re-disclosed by authorized recipients unless otherwise prohibited by law. <br> <br>
                        I (or my parent/guardian/legal representative) understand that this authorization may be refused. I (or my parent/guardian/legal representative) may also revoke (withdraw) this NovoCare® authorization at any time in the future by calling 1-888-668-6444 or writing to NovoCare® 501 W. Church St. #405, Orlando,FL 32805. Such refusal or future revocation will not affect my (or the patient’s) commencement or continuation of treatment by healthcare providers, pharmacies, service providers, insurer(s), etc. However, if I (or my parent/guardian/legal representative) revoke this authorization, there can be no further participation in the programs and/or services administered by NovoCare®. <br> <br>
                        If I (or my parent/guardian/legal representative) revoke this authorization, NovoCare® will stop using or sharing my (or the patient’s) Personal Information (except as necessary to end participation) but such revocation will not affect uses and disclosures of Personal Information previously disclosed in reliance upon this authorization. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may receive a copy of this authorization which will remain valid for so long as necessary to facilitate the NovoCare® Program unless a shorter time period is required by federal or state law. I (or my parent/guardian/legal representative) also understand that NovoCare® may change or end at any time without prior notification.`,
                        disclaimer: 'You must read the above text by scrolling to the bottom of the box before opting in.'
                    },
                    tcpaConsent:{
                        label:'NovoCare® Telephone Consumer Protection Act [TCPA] Authorization (Optional)',
                        options: [
                            {
                                valueString: 'tcpa',
                                displayedString:
                                    'I agree to the Telephone Consumer Protection Act [TPCA] Communication Authorization statement'
                            }
                        ],
                        content:`I (or my parent/guardian/legal representative) also agree to be contacted by NovoCare® and others on its behalf by telephone calls made by or using an automated dialing system or pre-recorded messages at the number(s) provided in this Application, for all non-marketing purposes. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may be asked to provide my (or the patient’s) zip code and date of birth during pre-recorded calls in order to verify my (or the patient’s) identity and that this information will not be retained by NovoCare® or its partners but is simply to verify identity. I (or my parent/guardian/legal representative) agree to notify NovoCare® promptly if any of my numbers or addresses change in the future. I (or my parent/guardian/legal representative) understand that this consent is not required, or a condition of purchase and it can be revoked at any time. I (or my parent/guardian/legal representative) further understand that I (or my parent/guardian/legal representative) can review the full Novo Nordisk Privacy Policy at https://www.novonordisk-us.com/privacy-notice.html.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                    },
                    smsConsent:{
                        label:'NovoCare® SMS Texting Authorization (Optional)',
                        options: [
                            {
                                valueString: 'sms',
                                displayedString:
                                    'Opt in for Text Messaging'
                            }
                        ],
                        content:`Yes, I have read and understand the NovoCare® SMS Terms of Use below and realize that Novo Nordisk or its partners may use my information to provide me with program status updates, quality monitoring, and as more fully explained in Novo Nordisk’s Privacy Notice. I understand any calls or texts may be generated using an automated technology and I do not have to consent to receive communications via telephone or text messaging before purchasing goods or receiving other services from Novo Nordisk.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        termsOfUseLink:'https://www.novocare.com/eligibility/NovoCare-Text.html',
                        termsOfUseLinkText:'Terms of Use'
                    },
                    marketingMsgConsent:{
                        label:'NovoCare® Marketing Messaging Authorization (Optional)',
                        options: [
                            {
                                valueString: 'marketingMsg',
                                displayedString:
                                    'Opt in for Marketing Materials'
                            }
                        ],
                        rareBloodContent:`I agree that the information I provide may also be used by Novo Nordisk, its affiliates, or vendors to keep me informed about new products, services, special offers, or other opportunities that may be of interest to me, as they become available.
                        These communications may contain material marketing or advertising Novo Nordisk products, goods, or services. I understand that I do not have to consent to receive communications before purchasing goods or receiving other services from Novo Nordisk. Novo Nordisk will take reasonable measures to protect my information. I can stop Novo Nordisk from sending me future communications by clicking the “unsubscribe” link within any email you receive, by calling 1-877-744-2579, or by sending us a letter containing your full contact information (e.g., name, email address, phone) to Novo Nordisk, 800 Scudders Mill Road, Plainsboro, New Jersey 08536.`,
                        obesityContent:`I agree that the information I provide may also be used by Novo Nordisk, its affiliates, or vendors to keep me informed about new products, services, special offers, or other opportunities that may be of interest to me, as they become available.
                        These communications may contain material marketing or advertising Novo Nordisk products, goods, or services. I understand that I do not have to consent to receive communications before purchasing goods or receiving other services from Novo Nordisk. Novo Nordisk will take reasonable measures to protect my information. I can stop Novo Nordisk from sending me future communications by clicking the “unsubscribe” link within any email you receive, by calling 1-877-744-2579, or by sending us a letter containing your full contact information (e.g., name, email address, phone) to Novo Nordisk, 800 Scudders Mill Road, Plainsboro, New Jersey 08536.`,
                        growthContent:`I agree that the information I provide may also be used by Novo Nordisk, its affiliates, or vendors to keep me informed about new products, services, special offers, or other opportunities that may be of interest to me, as they become available.
                        These communications may contain material marketing or advertising Novo Nordisk products, goods, or services. I understand that I do not have to consent to receive communications before purchasing goods or receiving other services from Novo Nordisk. Novo Nordisk will take reasonable measures to protect my information. I can stop Novo Nordisk from sending me future communications by clicking the “unsubscribe” link within any email you receive, by calling 1-877-744-2579, or by sending us a letter containing your full contact information (e.g., name, email address, phone) to Novo Nordisk, 800 Scudders Mill Road, Plainsboro, New Jersey 08536.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.'
                    },
                    fcraConsent:{
                        label: `NovoCare® Income Verification Fair Credit Reporting Act [FCRA] <br>
                        Authorization for the Patient Assistance Program`,
                        options: [
                            {
                                valueString: 'fcra',
                                displayedString:
                                    'I agree to the NovoCare® Income Verification Fair Credit Reporting Act [FCRA] <br> Authorization for the Patient Assistance Program'
                            }
                        ],
                        content:`I understand that I am providing “written instructions” under the Fair Credit Reporting Act (“FCRA”), authorizing NovoCare®, Novo Nordisk, and its authorized vendor(s) on an on-going basis as needed for the duration of my participation in programs administered by Novo Nordisk NovoCare®, to obtain information from my credit profile or other information from the vendor through e-income verification which will include a soft credit check solely for the purpose of determining financial qualifications for programs administered by Novo Nordisk. <br> <br>
                        I understand that I must affirmatively agree to these terms in order to proceed in this financial screening process. I promise that any information, including financial and insurance information that I provide, is complete and true. I also understand that I may need to provide additional documentation and that additional eligibility requirements apply for Novo Nordisk Patient Assistance Program.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        tooltip: 'NovoCare® will only utilize the e-income verification tool if the patient\'s eligibility for Patient Assistance Program (PAP) needs to be evaluated. PAP provides free drug to patients who meet eligibility requirements.'
                    },
                    PapAuthorization:{
                        label: 'PATIENT ASSISTANCE PROGRAM AUTHORIZATIONS',
                        subText: 'Please ONLY complete this section if patient is applying to PAP'
                    },
                    asstProgAuthConsent:{
                        label:'NovoCare® Patient Assistance Program Authorization',
                        options: [
                            {
                                valueString: 'asstProgAuth',
                                displayedString:
                                    'I agree to the NovoCare® Patient Assistance Program Authorization Statement'
                            }
                        ],
                        rareBloodContent:`I (or my parent/guardian/legal representative) hereby certify that I (or my parent/guardian/legal representative): (i) am over 18; (ii) am a United States citizen or legal resident; (iii) do not have the ability to pay for the medication(s) requested by my (or the patient’s) health care provider prescription(s.) I authorize NovoCare® to determine if I am eligible for the program. Patient Assistance Program requirements can be found at NovoCare.com or call 1-844-668-6732. <br> <br>
                        I also certify that I am not enrolled in or eligible for any of the following: (i) Medicaid; (ii) Medicare Extra Help/Low Income Subsidy (“LIS”); (iii) federally funded insurance programs, with the exception of Medicare Part D; or (iv) receive prescription drug benefits throughout the U.S. Veterans Administration, other than Medicare Part D. Patients enrolled in Medicare Part D who satisfy the financial eligibility criteria qualify for the program, but once enrolled, must stay in the program through the end of the calendar year. <br> <br>
                        I certify that (i) all information provided is true and correct and that I (or my parent/guardian/legal representative) will verify any of the information provided to PAP upon request; (ii) will verify my (or the patient’s) application status and receipt of the indicated medication(s) upon request by PAP; (iii) if approved to participate in PAP, I (or my parent/guardian/legal representative) will not seek reimbursement for the medication(s) requested from any government program or third-party insurer; and (iv) will comply with any insurance carrier disclosure requirements, including my participation in PAP. I give permission for Novo Nordisk (and its authorized partners) to contact me about my PAP application at any time. <br> <br>
                        Lastly, I (or my parent/guardian/legal representative) understand and agree: (i) my eligibility to participate in PAP is subject to Novo Nordisk’s decision and that Novo Nordisk may modify or terminate PAP at any time; (ii) I may be required to provide proof of ineligibility for certain other prescription drug coverage programs in order to meet the eligibility requirements for PAP; and (iii) I am required to report any changes to my health insurance and prescription drug coverage to PAP. <br> <br>
                        I (or my parent/guardian/legal representative) understands that the product received through the PAP is provided to me free of charge and that I have no obligation to purchase the product due to my participation in the PAP.  I (or my parent/guardian/legal representative) also give permission to PAP to combine or aggregate any information collected about me with information PAP may collect from other sources for the purpose of providing or administering PAP. <br> <br>
                        If a safety concern is reported, I (or my parent/guardian/legal representative) give permission to share my personal information to Novo Nordisk, who may contact me with follow-up inquiries, and who may report my personal information to the health authorities to comply with applicable rules and regulations.`,
                        growthContent:`I (or my parent/guardian/legal representative) hereby certify that I (or my parent/guardian/legal representative): (i) am over 18; (ii) am a United States citizen or legal resident; (iii) do not have the ability to pay for the medication(s) requested by my (or the patient’s) health care provider prescription(s.) I authorize NovoCare® to determine if I am eligible for the program. Patient Assistance Program requirements can be found at NovoCare.com or call 1-888-668-6444. <br> <br>
                        I also certify that I am not enrolled in or eligible for any of the following: (i) Medicaid; (ii) Medicare Extra Help/Low Income Subsidy (“LIS”); (iii) federally funded insurance programs, with the exception of Medicare Part D; or (iv) receive prescription drug benefits throughout the U.S. Veterans Administration, other than Medicare Part D. Patients enrolled in Medicare Part D who satisfy the financial eligibility criteria qualify for the program, but once enrolled, must stay in the program through the end of the calendar year. <br> <br>
                        I certify that (i) all information provided is true and correct and that I (or my parent/guardian/legal representative) will verify any of the information provided to PAP upon request; (ii) will verify my (or the patient’s) application status and receipt of the indicated medication(s) upon request by PAP; (iii) if approved to participate in PAP, I (or my parent/guardian/legal representative) will not seek reimbursement for the medication(s) requested from any government program or third-party insurer; and (iv) will comply with any insurance carrier disclosure requirements, including my participation in PAP. I give permission for Novo Nordisk (and its authorized partners) to contact me about my PAP application at any time. <br> <br>
                        Lastly, I (or my parent/guardian/legal representative) understand and agree: (i) my eligibility to participate in PAP is subject to Novo Nordisk’s decision and that Novo Nordisk may modify or terminate PAP at any time; (ii) I may be required to provide proof of ineligibility for certain other prescription drug coverage programs in order to meet the eligibility requirements for PAP; and (iii) I am required to report any changes to my health insurance and prescription drug coverage to PAP. <br> <br>
                        I (or my parent/guardian/legal representative) understands that the product received through the PAP is provided to me free of charge and that I have no obligation to purchase the product due to my participation in the PAP.  I (or my parent/guardian/legal representative) also give permission to PAP to combine or aggregate any information collected about me with information PAP may collect from other sources for the purpose of providing or administering PAP. <br> <br>
                        If a safety concern is reported, I (or my parent/guardian/legal representative) give permission to share my personal information to Novo Nordisk, who may contact me with follow-up inquiries, and who may report my personal information to the health authorities to comply with applicable rules and regulations.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        tooltip: 'NovoCare® Patient Assistance Program (PAP) is free and provides medication to eligible applicants at no charge. If the applicant qualifies under the Novo Nordisk PAP guidelines, the prescribed dose of the requested medication(s) will be shipped to the patient\'s home.'
                    },
                    medEnrollAuthConsent:{
                        label: 'NovoCare® Patient Medicare Part D Enrollee Authorization ',
                        options: [
                            {
                                valueString: 'medEnrollAuth',
                                displayedString:
                                    'I agree to the NovoCare® Patient Medicare Part D Enrollee Authorization <br> for the Patient Assistance Program'
                            }
                        ],
                        content:`I (or my parent/guardian/legal representative agree that if I am (or the patient is) approved for PAP as a Part D Enrollee, that I will provide Novo Nordisk with my Part D plan information, including Plan name, Plan ID, Group Number, and Plan address and other contact information. I will provide this information so that NovoCare® can notify my Medicare Part D Plan what specific medication I have been prescribed and am receiving under Novo Nordisk’s free drug program, and can further advise the Plan that I  will not seek coverage for these products under the Medicare Part D prescription drug insurance plan and will not apply any Novo Nordisk PAP medication towards my True-Out-Of-Pocket (TrOOP) costs.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        tooltip: 'tooltiptext'
                    },
                    textMessagingConsent:{
                        label:'Text Messaging Consent',
                        options: [
                            {
                                valueString: 'textMessaging',
                                displayedString:
                                    'By checking this box, I acknowledge that I have read and understand the Text Messaging Consent and agree to its terms.'
                            }
                        ],
                        content:`I acknowledge that by checking the Text Messaging Consent box below, I expressly consent to receive text messages or automated calls from or on behalf of Sanofi at the mobile phone number(s) that I provide. I confirm that I am the subscriber for the mobile phone number(s) provided, and I agree to notify Sanofi promptly if any of my number(s) change in the future. I understand that my wireless service provider’s message and data rates may apply to any text messages that I receive from or on behalf of Sanofi at the mobile phone number(s) that I provide. I understand that I can opt out of future text messages at any time. To opt out of receiving texts, I understand that I should reply “STOP” to 833-930-2575. <br/><br/>
                        I understand that my consent to receiving text messages from or on behalf of Sanofi is not required as a condition of purchasing any goods or services from Sanofi or its affiliates.<br/>
                        `,
                        checkBoxLabel:'By checking this box, I acknowledge that I have read and understand the Text Messaging Consent and agree to its terms.'
                    },
                    patientConsentAndCertifications:{
                        label:'Patient Assistance Program Authorization',
                        options: [
                            {
                                valueString: 'certification',
                                displayedString:
                                    'I have read and agree to the patient consent and certifications.'
                            }
                        ],
                        content:'I hereby authorize Sanofi and its affiliates and agents to provide services to me under the CareASSIST Patient Support Program, as described in this form and as may be supplemented in the future. Such services may include: determining if I am eligible to enroll in and/ or receive services from CareASSIST, including access and reimbursement assistance services, patient assistance programs, and resource services; investigating my health insurance coverage benefits; providing information on prior authorizations and appeals of denied claims for coverage/reimbursement; referring me to, or determining my eligibility for, other programs and/or alternate sources of funding; and providing information on other independent support services that may be available to me (together, the “Services”). If enrolling in the CareASSIST Patient Assistance Program, which provides free medication to eligible patients from Sanofi Cares North America, I certify that the number of people in my household and my household income provided on the Income Verification step are true and accurate to the best of my knowledge. To qualify for the CareASSIST Patient Assistance Program, I understand that I must meet certain income and other eligibility requirements. Further, I understand that I am authorizing Sanofi and its affiliates and agents under the Fair Credit Reporting Act to use my date of birth and/or additional demographic information to access and obtain information from my personal credit profile, as well as use information derived from public and other sources, to estimate my income in conjunction with the eligibility determination process. Continuation in the program is conditional upon timely verification of income. If requested, I agree to provide CareASSIST with proof of income within thirty (30) days of the request. I agree to immediately inform CareASSIST and my doctor/healthcare provider if my income or insurance status changes during the course of my participation in the CareASSIST Patient Assistance Program. If enrolling in the CareASSIST Copay Program, I agree to my enrollment in such program if confirmed as eligible. I understand that copay information will be sent to my physician or the designated specialty pharmacy, and any assistance with my applicable cost-sharing or copayment for each medication selected by my prescriber will be made in accordance with the Program terms and conditions. I understand that I may be contacted by Sanofi in the event that I report an adverse event. I authorize Sanofi and its affiliates and agents to contact me by mail, telephone (including calls made with an automatic telephone dialing system or a prerecorded voice), or email with information about CareASSIST, Sanofi products, my condition, promotions, services, and research studies, and to ask my opinion about such information and topics, including market research and disease-related surveys (“The Communications”). I understand that the frequency of these messages will vary. I understand and acknowledge that communications transmitted via unencrypted email or over an open network may be inherently unsecure, and there is no assurance of confidentiality for information communicated in this manner. I understand that I do not have to enroll in CareASSIST or receive The Communications and that I can still receive Sanofi products as prescribed by my physician. I may opt out of receiving Communications and/or individual Services, including the CareASSIST Patient Assistance Program, or opt out of CareASSIST entirely at any time by notifying a CareASSIST representative by telephone at 1-833-WE+CARE (1-833-930-2273) or by sending a letter to CareASSIST, 450 Water St., 3rd Floor, Cambridge, MA 02141. I also understand that the Services may be revised, changed, or terminated at any time.',
                        checkBoxLabel:'I have read and agree to the patient consent and certifications.',
                        tooltip: `NovoCare® Patient Assistance Program (PAP) is free and provides medication to eligible applicants at no charge. If the applicant qualifies under the Novo Nordisk PAP guidelines, the prescribed dose of the requested medication(s) will be shipped to the patient's home.`,
                    },
                    patientAuthorizationStatement: {
                        label: 'Patient Authorization to Disclose Information',
                        options: [
                            {
                                valueString: 'consent',
                                displayedString:
                                    'I have read and agree to the patient authorization.'
                            }
                        ],
                        content: `I authorize my healthcare providers and staff; my health insurer, health plan, or programs that provide me healthcare benefits (together, “Health Insurers”); and any specialty pharmacies that dispense my medication to disclose to Sanofi, and its affiliates and agents, health information about me, including patient-related information provided throughout this form and related to my medical condition, treatment with prescribed Sanofi therapies, health insurance coverage, claims, prescriptions, and referral to and enrollment in the CareASSIST Patient Support Program and Copay Program (together, “My Information”). My healthcare providers, Health Insurers, specialty pharmacies, and Sanofi (including its agents and affiliates) may use and disclose My Information for the purposes of providing certain support services, including: to determine if I am eligible to enroll in and/or receive services from CareASSIST, including access and reimbursement assistance services, patient financial assistance programs, and resource services; for the operation and administration of CareASSIST; to investigate my health insurance coverage benefits; to assist with prior authorization for coverage/ reimbursement; to assist with the status of appeals of denied claims for coverage/reimbursement; and to refer me to, or to determine eligibility for, other programs and/or alternate sources of funding—such as Medicaid, healthcare exchanges, Medigap, state pharmaceutical assistance programs (SPAPs), and charitable foundations— that may be available to assist me with the costs of my medications. I further authorize Sanofi and its affiliates and agents to de-identify my health information and use it in performing research, education, business analytics, and marketing studies, or for other commercial purposes, including linkage with other de-identified information Sanofi may receive from other sources. I understand that Sanofi and its affiliates and agents may share My Information, including identifiable health information, among themselves in order to de-identify it for these purposes and as needed to perform the Services or to send the Communications. I understand and agree that Sanofi and its affiliates and agents may use My Information for these purposes and may share My Information with my doctors, specialty pharmacies, and Health Insurers. I understand and agree that my healthcare providers, Health Insurers, and specialty pharmacies may receive remuneration from Sanofi in exchange for disclosing My Information to Sanofi and/or for providing me with support services in connection with CareASSIST. Once My Information has been disclosed to Sanofi, I understand that federal privacy laws may no longer protect it from further disclosure. However, Sanofi agrees to protect My Information by using and disclosing it only for the purposes authorized in this authorization or as otherwise required by law. I understand that I may have certain rights under applicable data privacy laws regarding My Information, including the right to access My Information held by Sanofi. For further information regarding these rights, please reference the Sanofi Global Privacy Policy at www.sanofi.com/en/our-responsibility/sanofi-global-privacy-policy. I understand that if I decline to sign this authorization, I will not be able to participate in CareASSIST, but it otherwise will not affect my eligibility to obtain medical treatment, my ability to seek financial assistance from other sources, or my insurance enrollment or eligibility for insurance coverage. Furthermore, I understand that I may withdraw (take back) this authorization at any time by mailing or faxing a written request to CareASSIST, 450 Water St., 3rd Floor, Cambridge, MA 02141; Fax: 1-855-411-9689. Withdrawal of this authorization will end further uses and disclosures of My Information by the parties identified in this authorization except to the extent those uses and disclosures have been made in reliance upon this authorization prior to my request to withdraw this authorization. This authorization expires 18 months from the date support is last provided under any CareASSIST program, subject to applicable law, unless I withdraw it earlier. I understand that I may request a copy of this authorization.`,
                        checkBoxLabel:'I have read and agree to the patient authorization.'
                    },
                    patientParticipation:{
                        label:"Patient Participation",
                        content:`If your patient wishes to participate in the CareASSIST Program, there are sections of this application they must complete. Your patient must read, understand, and sign the Patient Consent and Certifications and the Patient Authorization to Disclose Information.<br/>
                        By providing your patient’s email address or cell phone number below and pressing “Send”, you certify that you have obtained the patient’s consent to receive email and/or text messages (as applicable) related to the CareASSIST Program, including notifying the patient that s/he has the right to opt out of future messages at any time, and, in the case of text messages, that his/her wireless service provider’s message / data rates may apply and his/her consent is not required as a condition of purchasing any goods or services from Sanofi US or their affiliates.`
                    },
                    missingPatient:{
                        label:"Missing Patient Email / Cell Phone",
                        content:"If you do not have an email address or cell phone number for your patient, you can submit your portion of this application now. CareASSIST will make a limited number of attempts to secure the information we need from your patient, including a signature on the Patient Consent and Certifications and the Patient Authorization to Disclose Information sections of this application. CareASSIST will contact your patient using the information you have provided within this application."
                    },
                    determineEligiblity:{
                        label:"Determine Eligiblity",
                        content:"CareASSIST cannot make an eligibility determination without securing all necessary information from your patient, including obtaining their signature on the Patient Consent and Certifications and the Patient Authorization to Disclose Information sections of this application."
                    },
                    doAgreeAuthorization: {
                        label: 'Do you agree to the Patient Authorization Statement?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' }
                        ]
                    },
                    sendMessageNow: {
                        label: 'Would you like to send the patient a message now?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' }
                        ]
                    },
                    patientOrLegalEmail:"Patient or Legal Representative Email",
                    patientOrLegalNumber: 'Patient or Legal Representative Cell Phone Number',
                    optIn: {
                        label: '',
                        options: [
                            {
                                valueString: 'Text',
                                displayedString:
                                    'Opt in for text updates<br/>(See the above Patient Authorization Statement for Terms & Conditions)'
                            },
                            {
                                valueString: 'Info',
                                displayedString: 'Opt in to receive information about XTANDI Patient Connect',
                                tooltip:
                                    'XTANDI Support Solutions offers XTANDI Patient Connect to patients who have been prescribed XTANDI® (enzalutamide). This support helps connect patients and caregivers to independent resources and third-party support services that may help them manage disease and daily life while on treatment.'
                            },
                            { valueString: 'Materials', displayedString: 'Opt in to receive patient educational materials' }
                        ]
                    },
                    signature: {
                        signerFullName: 'Enter Full Name',
                        placeholder:'Patient Signature',
                        typeItPreviewText: '',
                        signItPreviewText: 'Signature Box',
                        signItInstruction:
                            'By checking a box above and signing you certify you have read, understand and agree to the corresponding authorization section(s) above and expressly provide authorization and consent to be enrolled in the checked option(s).',
                        clearText: 'Clear',
                        showSignTypeSelect: false,
                        label: 'Type Signature'
                    },
                    legalSignature: {
                        signerFullName: 'Enter Full Name',
                        placeholder:'Legal Representative Signature',
                        typeItPreviewText: 'Input patient representative signature in here',
                        signItPreviewText: 'Signature Box',
                        signItInstruction:
                            'By checking a box above and signing you certify you have read, understand and agree to the corresponding authorization section(s) above on behalf of the patient and expressly provide authorization and consent for the patient to be enrolled in the checked option(s) as the legal representative of the patient.',
                        clearText: 'Clear',
                        showSignTypeSelect: false,
                        label: 'Type Signature'
                    },
                    witnessAuthorization: {
                        label: 'Witness',
                        options: [
                            {
                                valueString: 'witness',
                                displayedString: 'I attest to in witness whereof, [Signer] signing the patient authorization and release.'
                            }
                        ]
                    },
                    witnessInitials: 'Witness Full Name',
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel',
                        or:"OR",
                        send:"Send",
                        sent:"Sent!"
                    },
                    proceedModal:{
                        title:'Before you go...',
                        content:'An eligibility determination cannot be made until CareASSIST can secure all necessary information from your patient. Would you like to go back to send your patient a message now?',
                        primaryButtonText:'Yes, go back',
                        defaultButtonText:'No, continue'
                    },
                    cancelModal: {
                        title: 'Hold On!',
                        content:
                            'By selecting "No" to the Patient Authorization Statement, your patient will not be able to have insurance coverage verified, have alternate sources of assistance researched, or access other support provided by or on behalf of XTANDI Support Solutions. Are you sure you want to move forward without Patient Authorization?',
                        yesLeave: 'Yes, Continue',
                        noContinue: 'No, Go Back'
                    },
                    placeholders:{
                        legalRepName:'Input legal representative first and last name here',
                        relationshipToPatient:'Input relationship to patient here',
                        patientRepSignature:'Input patient representative signature in here',
                        witnessName:'Input witness\'s first and last name in here',
                        patientOrLegalEmail:"Input email in here",
                        patientOrLegalNumber: 'Input cell phone number in here',
                    },
                },
                actions: {
                    submitBtn: 'Submit',
                    cancelBtn: 'Cancel'
                },
                facilityInformation: {
                    step: {
                        header: 'Facility Information',
                        description: 'Please complete the following facility information.',
                        back: 'Previous Step'
                    },
                    body: {
                        facilityType: {
                            label: 'Facility Type',
                            option: [
                                {
                                    displayedString: 'Prescriber Office/Clinic',
                                    valueString: 'Prescriber Office/Clinic'
                                },
                                {
                                    displayedString: 'Hospital Outpatient',
                                    valueString: 'Hospital Outpatient'
                                },
                                {
                                    displayedString: 'Hospital Inpatient',
                                    valueString: 'Hospital Inpatient'
                                }
                            ]
                        },
                        facilityName: 'Site/Facility Name',
                        facilityNamePlaceholder: 'Facility name here',
                        addressLine1: 'Address 1',
                        addressLine1Placeholder: 'Facility address here',
                        addressLine2: 'Address 2',
                        addressLine2Placeholder: 'Building/suite #',
                        city: 'City',
                        cityPlaceholder: 'City here',
                        state: 'State',
                        statePlaceholder: 'State here',
                        zipCode: 'ZIP Code',
                        zipCodePlaceholder: 'ZIP Code here',
                        primaryContactName: 'Primary Contact Name',
                        primaryContactNamePlaceholder: 'Facility contact name here',
                        role: 'Title/Role',
                        rolePlaceholder: 'Facility contact title/role here',
                        primaryPhoneNumber: 'Primary Phone Number',
                        primaryPhoneNumberPlaceholder: '_ _ _-_ _ _-_ _ _ _',
                        primaryFaxNumber: 'Primary Fax Number',
                        primaryFaxNumberPlaceholder: '_ _ _-_ _ _-_ _ _ _',
                        primaryEmail: 'Primary Email',
                        primaryEmailPlaceholder: 'Facility contact email here'
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                prescriptionInformation: {
                    step: {
                        header: 'Prescription Information',
                        description: 'Please provide the following information to continue your patient\'s PAP enrollment.',
                        drugLink: 'Prescribing Information',
                        drugLinkUrlElitek: 'https://products.sanofi.us/elitek/elitek.html',
                        drugLinkUrlJevtana: 'https://products.sanofi.us/jevtana/jevtana.html',
                        drugLinkUrlSarclisa: 'https://products.sanofi.us/Sarclisa/sarclisa.pdf',
                        back: 'Previous Step'
                    },
                    body: {
                        specialtyPharmacy: {
                            label: 'If obtaining through specialty pharmacy, check which specialty pharmacy commercial prescription was sent to:',
                            option: [
                                {
                                    displayedString: 'CVS Specialty',
                                    valueString: 'CVS Specialty'
                                },
                                {
                                    displayedString: 'Biologics',
                                    valueString: 'Biologics'
                                }
                            ]
                        },
                       productSelected: "Product Selected",
                       icd10Code: "ICD-10 Code",
                       icd10CodePlaceholder: "Input ICD10 code here",
                       dosage: "Dosage",
                       dosagePlaceholder: "Input dosage as mg here",
                       quantity: "Quantity",
                       quantityPlaceholder: "Input quantity here",
                       refills: "Refills",
                       refillsPlaceholder: "Input refills here",
                       uploadedDocsPrescription: {
                        uploadLabel: `Would you like to upload a copy of the prescription?`,
                        description: 'Please use the upload button bellow',
                        restrictions: 'Files must be 20MB or less and in JPG, PNG or PDF format.',
                        documentHeader: 'Upload',
                        documentTypeId: DocumentType.UploadedFilePrescription,
                        documentDescriptor: 'Uploaded File (Prescription)',
                        deleteButton: 'Delete',
                        previewButton: 'Preview',
                        uploadButtonText: 'Upload',
                        fileSize: '(Files must be 20MB or less and in JPG, PNG, or PDF format)',
                        required: null
                        },
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                incomeVerification: {
                    step: {
                        header: 'Income Verification',
                        description: 'Please provide the following information to continue the patient’s enrollment.',
                        back: 'Previous Step'
                    },
                    body: {
                        householdSize: 'Household Size',
                        householdSizePlaceholder: 'Input household size in here',
                        householdSizeDescription: 'Including the patient',
                        annualHouseholdIncome: 'Annual Household Income',
                        annualHouseholdIncomePlaceholder: 'Input annual income in here',
                        annualHouseholdIncomeDescription: '',
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                errorPage: {
                    title: 'OOPs!',
                    description: `You have reached this page in error.
                      Please check the URL you were provided and try again.
                      We look forward to working with you!`
                }
            }
        };

        // Spanish
        this.spanish = {
            header: {
                bannerText: 'For US Healthcare Professionals Only',
                introductionStatement:
                    `${consentBrand} es un programa de apoyo dedicado a ayudar a los pacientes, los cuidadores y los ` +
                    `prescriptores a comprender el proceso de prescripción, asistencia financiera y la información del seguro para ` +
                    `productos ${consentCompany}.`,
                home: 'Hogar',
                learnMore: 'Aprende más',
                headerLinkText: `www.dupixent.com`,
                headerLinkUrl: `www.dupixent.com`,
                headerLogoLinkUrl: `www.novocare.com`,
                headerText: 'For US Healthcare Professionals Only',
                dropdownMenuContent: {
                    title: 'Prescribing Information'
                }
            },
            footer: {
                firstLine: `©2023 ${consentCompany}. All Rights Reserved. Intended for US Residents only.`,
                secondLine: `XTANDI<sup>®</sup>, Astellas<sup>®</sup>, and the flying star logo are registered trademarks of Astellas`,
                thirdLine: 'Pharma Inc. XTANDI Support Solutions<sup>®</sup> is a registered trademark of Astellas US LLC.',
                fourthLine: 'Astellas Pharma Support SolutionsSM  is a service mark of Astellas Pharma US, Inc.',
                fifthLine: `©2022 Astellas Pharma US, Inc. and Pfizer Inc.   All rights reserved.    076-7661-PM   <span class="text-danger">06</span>/22`,
                firstLineMobile: `© 2010-2022 ${consentCompany}. All rights reserved.`,
                secondLineMobile: ` Intended for US residents only.`,
                thirdLineMobile: 'XTANDI<sup>®</sup>, Astellas<sup>®</sup>, and the flying star logo are',
                fourthLineMobile: 'registered trademarks of Astellas',
                fifthLineMobile: `Pharma Inc. XTANDI Support Solutions<sup>®</sup> is a`,
                sixthLineMobile: `registered trademark of Astellas US LLC.`,
                seventhLineMobile: `Astellas Pharma Support Solutions&#8480  is a`,
                eighthLineMobile: `service mark of Astellas Pharma US, Inc.`,
                ninthLineMobile: `©2022 Astellas Pharma US, Inc. and Pfizer Inc.`,
                tenthLineMobile: `All rights reserved. 076-7661-PM  <span class="text-xx">06</span>/22`,
                privacyText: 'Privacy Policy',
                privacyLink: 'https://www.astellas.com/us/privacy-policy',
                legalLink: 'https://www.astellas.com/us/legal',
                legalText: 'Legal Disclaimer',
                clientLegalText: 'Terms & Conditions',
                privacyPolicy: privacyLink,
                termAndConditions: termUseLink,
                clientLine: `<span>NovoCare® y Novo Nordisk son marcas registradas de Novo Nordisk A/S.</span> <br>` +
                `<span>Todas las demás marcas comerciales, registradas o no registradas, son propiedad de sus respectivos dueños. </span> <br>` +
                `<span>© 2023 Novo Nordisk Todos los derechos reservados. APRIL 2023</span>`,
                clientLineMobile: `<span>NovoCare® y Novo Nordisk son marcas registradas de Novo Nordisk A/S.</span> <br>` +
                ` <span>Todas las demás marcas comerciales, registradas o no registradas, son propiedad de sus respectivos dueños.</span> <br>` +
                `<span>© 2023 Novo Nordisk Todos los derechos reservados. <br> APRIL 2023</span>`,
                additionalClientLine: 'MAT-US-2208636-v2.0-12/2022',
                clientPrivacyLink: `https://www.novonordisk-us.com/privacy-notice.html`,
                clientContactUsLink: `https://www.novocare.com/contact-us.html`,
                contactUs: 'Contacta Con Nosotras',
                novoNordiskUs: 'Novo Nordisk US',
                clientNovoNordiskUsLink: `https://www.novonordisk-us.com/`,
            },
            formPlaceholder: {
                dobPlaceholder: 'MM/DD/YYYY'
            },
            views: {
                welcome: {
                    step: {
                        header: 'Welcome',
                        description: 'Select an option to start your enrollment in the myRARE patient support program.'
                    },
                    body: {
                        pageHeader: 'Please select the appropriate patient assistance offering.',
                        pageDescription: 'Enrollment in myRARE requires the patient to have been prescribed EVKEEZA.',
                        options: [
                            {
                                value: 0,
                                title: 'Patient Consent for myRARE Patient Support Services',
                                description:
                                    'MyRARE is a patient support program designed to help with access, affordability, and resources.',
                                displayOption: true
                            },
                            {
                                value: 1,
                                title: 'Copay Assistance',
                                description:
                                    'Commercially insured patients may qualify to pay as as $0 per month for your treatment, subject to a maximum calendar year benefit of $100,000. There are no income requirements for the copay card.',
                                displayOption: false
                            },
                            {
                                value: 2,
                                title: 'Patient Assistance Program (PAP)',
                                description:
                                    'The Patient Assistance Program may help eligible patients get EVKEEZA at no cost if the patient meets income requirements and is uninsured or does not have coverage for EVKEEZA.',
                                displayOption: false
                            },
                            {
                                value: 3,
                                title: 'Upload Supporting Documentation',
                                description:
                                    'This option is for those that have already submitted an enrollment form and need to submit supporting documentation, such as proof of income, approval/denial letters, or a prior authorization.',
                                displayOption: true
                            }
                        ]
                    },
                    action: {
                        submitBtn: 'Continue'
                    }
                },
                patientAssistanceProgramView: {
                    step: {
                        header: 'Patient Assistance Program',
                        subHeader: '',
                        description:
                            'Responda las siguientes preguntas para que XTANDI Support Solutions pueda evaluar la elegibilidad de su paciente para el Programa de Asistencia al Paciente (PAP) de Astellas.',
                        requiredText:
                            '<i>Tenga en cuenta:<text-required><span class="text-required"> Todos los campos indicados con un asterisco (<span class="required">*</span>) son obligatorios.</span></i>',
                        back: 'Paso anterior'
                    },
                    patientAssistanceProgram: {
                        label: 'Para evaluar la elegibilidad de su paciente para el Programa de Asistencia al Paciente (PAP) de Astellas, ¿cuál de los siguientes describe mejor a su paciente?',
                        option: [
                            {
                                valueString: 'Mi paciente no tiene cobertura de seguro de medicamentos recetados',
                                displayedString: 'Mi paciente no tiene cobertura de seguro de medicamentos recetados'
                            },
                            {
                                valueString: 'My patient has prescription insurance but it has denied coverage for XTANDI',
                                displayedString: 'Mi paciente tiene seguro de medicamentos recetados, pero ha negado la cobertura de XTANDI'
                            },
                            {
                                valueString: 'My patient has Medicare Part D and cannot afford the out-of-pocket costs',
                                displayedString: 'Mi paciente tiene la Parte D de Medicare y no puede pagar los costos de su bolsillo'
                            },
                            {
                                valueString: 'Not applicable. My patient does not need PAP',
                                displayedString: 'No procede. Mi paciente no necesita PAP'
                            }
                        ]
                    },
                    cancelModal: {
                        title: '¡Espera!',
                        content:
                            '¿Está seguro de que desea avanzar sin la Certificación de Prescriptor? XTANDI Support Solutions no podrá completar el procesamiento de la solicitud de su paciente sin la Certificación de Prescriptor y hará un seguimiento con su oficina para obtener la certificación necesaria.',
                        yesLeave: 'Sí, continuar',
                        noContinue: 'No, volver'
                    },
                    action: {
                        submitBtn: 'Continuar',
                        cancelBtn: 'Cancelar'
                    }
                },
                patient: {
                    dropdownPlaceholder: 'Seleccione una opción',
                    fieldIsRequiredError: 'Eso es obligatorio',
                    step: {
                        header: 'Información para el paciente',
                        subHeader: 'PASO 1 DE 2',
                        description: `Proporcione la siguiente información para comenzar con la inscripción en el programa ${consentBrand}.`,
                        required: { text: 'Obligatorio' }
                    },
                    firstName: 'Nombre',
                    lastName: 'Apellido',
                    sex: {
                        label: 'Sexo',
                        option: [
                            { valueString: 'M', displayedString: 'Masculino' },
                            { valueString: 'F', displayedString: 'Femenino' }
                        ]
                    },
                    dob: 'Fecha de nacimiento',
                    address: 'Dirección',
                    addressLine2: 'Dirección, línea 2',
                    city: 'Ciudad',
                    state: {
                        label: 'Estado'
                    },
                    postalCode: 'Código postal',
                    // preferredContactNumber: {
                    //     label: 'Número de contacto preferido',
                    //     option: [
                    //         { valueString: 'Home', displayedString: 'Teléfono particular' },
                    //         { valueString: 'Mobile', displayedString: 'Celular' }
                    //     ]
                    // },
                    primaryContactNumber: {
                        label: '',
                        option: [
                            { valueString: 'Cell', displayedString: 'Privilegiada #' }
                        ]
                    },
                    primaryPhone: 'Teléfono móvil',
                    preferredAltContactNumber: {
                        label: '',
                        option: [
                            { valueString: 'Home', displayedString: 'Privilegiada #' }
                        ]
                    },
                    altPrimaryPhone: 'Teléfono de casa',
                    homePhone: 'Teléfono particular',
                    mobile: 'Celular',
                    okToLeaveMessage: {
                        label: 'Acepta que se dejen mensajes',
                        option: [
                            { valueString: 'Y', displayedString: 'Sí' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    bestTimeToReachMe: {
                        label: 'Mejor momento para comunicarse conmigo',
                        option: [
                            { valueString: 'Morning', displayedString: 'Mañana' },
                            { valueString: 'Afternoon', displayedString: 'Tarde' },
                            { valueString: 'Evening', displayedString: 'Noche' }
                        ]
                    },
                    altContactOrCaregiver: {
                        label: 'Agregar un contacto/cuidador alternativo?',
                        option: [
                            { valueString: 'Y', displayedString: 'Sí' },
                            { valueString: 'N', displayedString: 'No' }
                        ],
                        tooltip:''
                    },
                    emailAddress: 'Dirección de correo electrónico',
                    dmdPrescriberName: 'Nombre del prescriptor para distrofia muscular de Duchenne (DMD)',
                    actions: {
                        submitBtn: 'Continuar'
                    },
                    caregiverFirstName: 'Nobre',
                    caregiverLastName: 'Apellido',
                    caregiverEmail: 'Correo electrónico',
                    caregiverPhone: 'Teléfono',
                    caregiverPhoneType: {
                        label: 'Escribe?',
                        option: [
                            { valueString: 'Cell', displayedString: 'Célula' },
                            { valueString: 'Home', displayedString: 'Hogar' }
                        ],
                    },
                    caregiverPatientConsent:{
                        label: 'El paciente da su consentimiento para que el programa se comunique con el <span class="rttp"> [RttP]</span>',
                        option: [
                            { valueString: 'Y', displayedString: 'Sí' },
                        ]
                    },
                    caregiverRelationshipToPatient: {
                        label: 'Relación con la/el paciente',
                        option: [
                            { valueString: 'Spouse', displayedString: 'Esposa/Esposo' },
                            { valueString: 'Parent', displayedString: 'Madre/Padre' },
                            { valueString: 'Child', displayedString: 'Niña/Niña'},
                            { valueString: 'Unknown', displayedString: 'Desconocido' },
                            { valueString: 'Other', displayedString: 'Otra Relación' }
                        ]
                    },
                    placeholders:{
                        patientFirstName:"Ingrese el nombre del paciente aquí",
                        patientLastName:"Ingrese el apellido de la paciente aquí",
                        patientAddressLine1:"Ingrese la dirección del paciente aquí",
                        patientAddressLine2:"Ingrese el número de edificio o suite aquí",
                        patientCity:"Ingrese la ciudad del paciente aquí",
                        patientZip:"Ingrese el código postal del paciente aquí",
                        patientPhone:"_ _ _-_ _ _-_ _ _ _",
                        patientEmail:"Ingrese el correo electrónico del paciente aquí",
                        caregiverFirstName:"Ingrese el nombre del cuidador aquí",
                        caregiverLastName:"Ingrese el apellido del cuidador aquí",
                        caregiverEmail:"Ingrese la relación del cuidador aquí",
                        caregiverPhone:"Ingrese el número de teléfono del cuidador aquí"
                    }
                },
                prescriberCertificationView: {
                    step: {
                        header: 'Prescriber Certification',
                        subHeader: '',
                        description:'Please sign the prescriber’s certification to continue. ',
                        requiredText:'',
                        back: 'Previous Step'
                    },
                    whoIsAuthorizing: {
                        label: 'Who is authorizing?',
                        option: [
                            { valueString: 'Patient', displayedString: 'Patient' },
                            { valueString: 'Legal Representative', displayedString: 'Legal Representative' }
                        ]
                    },
                    legalDiscloser:
                        'If signed by someone other than the patient, please describe your legal authority/power of attorney to sign on behalf of the patient (e.g. guardian, custodian, healthcare power of attorney). Please note that if you are the patient&lsquo;s prescriber, that alone does not give you legal authority to sign on behalf of the patient.',
                    legalRepFullName: 'Legal Representative First and Last Name',
                    releationToPatient: 'Relationship to Patient',
                    patientAuthorizationStatement: {
                        label: 'Patient Certification',
                        content:
                            'My signature below certifies that the person named on this form is my patient, the information provided on this application is complete and accurate to the best of my knowledge, and the medication received free of charge from the CareASSIST Patient Assistance Program in response to this application, if any, is exclusively for the patient named on this form. I certify that I have obtained my patient\'s written authorization in accordance with applicable state and federal law, including the Health Insurance Portability and Accountability Act of 1996 and its implementing regulations, to provide the individually identifiable health information on this form to CareASSIST for purposes of researching my patient\'s health insurance coverage for the medication on the Prescription Information step and assessing their eligibility for financial support programs offered through CareASSIST. It is my professional judgment that the medication selected on the Prescription Information step is medically necessary for the patient named on this form. I hereby certify that no medication received free of charge under the CareASSIST Patient Assistance Program shall be offered for sale, trade, or barter, and that no claim for reimbursement will be submitted to Medicare, Medicaid, or any third-party payer for medication received free of charge under the CareASSIST Patient Assistance Program. I consent to Sanofi and its affiliates and agents contacting me by fax, phone, mail, or email to confirm receipt of this medication and/or to provide additional information about this medication or CareASSIST. I understand that Sanofi may revise, change, or terminate any program services at any time without notice to me.'
                    },
                    doAgreeAuthorization: {
                        label: 'Do you agree to the Patient Authorization Statement?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' }
                        ]
                    },
                    signature: {
                        signerFullName: 'Type Patient Signature',
                        typeItPreviewText: '',
                        signItPreviewText: 'Signature Box',
                        signItInstruction:
                            'By signing above, you certify that you have read, understand, and agree to the Patient Authorization Statement.',
                        clearText: 'Clear',
                        showSignTypeSelect: false
                    },
                    legalSignature: {
                        signerFullName: 'Type Legal Representative Signature',
                        typeItPreviewText: '',
                        signItPreviewText: 'Signature Box',
                        signItInstruction:
                            'By signing above, you certify that you have read, understand, and agree to the Patient Authorization Statement, are signing on behalf of the patient, and have the legal right to do so, that you are the parent or legal guardian of the patient, or that you otherwise have a valid power of attorney to act on behalf of the patient.',
                        clearText: 'Clear',
                        showSignTypeSelect: false
                    },
                    witnessAuthorization: {
                        label: 'Witness',
                        options: [
                            {
                                valueString: 'Witness',
                                displayedString: 'I attest to in witness whereof, [Signer] signing the patient authorization and release.'
                            }
                        ]
                    },
                    witnessInitials: 'Witness Initials',
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    },
                    cancelModal: {
                        title: 'Hold On!',
                        content:
                            'By selecting “No” to the Patient Authorization Statement, you will not be able to have insurance coverage verified, have alternate sources of assistance researched, or access other support provided by or on behalf of XTANDI Support Solutions. Are you sure you want to move forward without Patient Authorization?',
                        yesLeave: 'Yes, Continue',
                        noContinue: 'No, Go Back'
                    }
                },
                consent: {
                    step: {
                        header: 'Consentimiento del paciente',
                        subHeader: 'PASO 2 DE 2',
                        description: `Revise y proporcione su firma para su participación en el programa ${consentBrand}.`,
                        required: { text: 'Obligatorio' },
                        back: 'Volver al paso anterior'
                    },
                    whoIsAuthorizing: {
                        label: '¿Quién está autorizando?',
                        option: [
                            { valueString: 'Patient', displayedString: 'Paciente' },
                            { valueString: 'Guardian/Caregiver', displayedString: 'Tutor/cuidador' }
                        ]
                    },
                    relationshipToPatient: 'Relación con el paciente',
                    consentForm: {
                        label: 'Autorización de la HIPAA y participación en el programa del paciente',
                        option: [
                            {
                                valueString: 'a',
                                displayedString:
                                    'Reconozco que he leído y comprendo la Autorización de la HIPAA y la participación en el programa' +
                                    ' del paciente.'
                            }
                        ]
                    },
                    consentFormContent:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ' +
                        'ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac habitasse platea. Nibh tortor id' +
                        ' aliquet lectus proin nibh nisl condimentum id. Pellentesque nec nam aliquam sem. Metus vulputate eu scelerisque' +
                        ' felis imperdiet. In vitae turpis massa sed elementum tempus. Pulvinar neque laoreet suspendisse interdum. Euismod ' +
                        'in pellentesque massa placerat duis ultricies lacus sed turpis. Nibh venenatis cras sed felis. Lacus suspendisse ' +
                        'faucibus interdum posuere lorem ipsum dolor sit amet. Nunc congue nisi vitae suscipit tellus. Etiam dignissim diam ' +
                        'quis enim lobortis scelerisque fermentum dui. In massa tempor nec feugiat nisl pretium. Amet consectetur adipiscing ' +
                        'elit ut aliquam purus sit. Lectus magna fringilla urna porttitor. Aenean pharetra magna ac placerat. Integer enim ' +
                        'neque volutpat ac tincidunt vitae. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. ' +
                        'Consectetur libero id faucibus nisl. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Semper eget duis' +
                        ' at tellus. Id neque aliquam vestibulum morbi blandit. Non tellus orci ac auctor augue mauris. Amet dictum sit amet ' +
                        'justo. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Netus et malesuada fames ac. Porttitor rhoncus ' +
                        'dolor purus non enim praesent elementum facilisis. Faucibus ornare suspendisse sed nisi lacus. Accumsan lacus vel ' +
                        'facilisis volutpat est velit egestas. Massa enim nec dui nunc mattis enim ut tellus. Id nibh tortor id aliquet lectus ' +
                        'proin nibh nisl. Amet volutpat consequat mauris nunc. Ipsum nunc aliquet bibendum enim facilisis gravida.' +
                        'Cursus euismod quis viverra nibh cras pulvinar mattis. In fermentum posuere urna nec tincidunt. Fringilla ut morbi ' +
                        'tincidunt augue interdum velit euismod in. Hac habitasse platea dictumst quisque sagittis purus sit amet. In mollis ' +
                        'nunc sed id semper risus in. Dui accumsan sit amet nulla facilisi morbi tempus. Diam sollicitudin tempor id eu nisl ' +
                        'nunc mi ipsum. Ipsum faucibus vitae aliquet nec ullamcorper. Volutpat odio facilisis mauris sit amet. Fermentum leo ' +
                        'vel orci porta non pulvinar neque laoreet. Elementum nisi quis eleifend quam. Commodo ullamcorper a lacus vestibulum ' +
                        'sed arcu non odio. Quam id leo in vitae turpis massa sed elementum tempus. Odio ut sem nulla pharetra diam sit.',
                    signature: {
                        signerFullName: 'Nombre completo del firmante',
                        typeItText: 'Escribir',
                        signItText: 'Firmar',
                        typeItPreviewText: 'Vista previa de la firma',
                        signItPreviewText: 'Cuadro de firma',
                        signItInstruction: 'Use un ratón o lápiz digital para firmar en el cuadro de firma arriba.',
                        clearText: 'Borrar'
                    },
                    actions: {
                        submitBtn: 'Enviar'
                    }
                },
                confirmation: {
                    headerSuccess: 'Su información se ha enviado',
                    descriptionSuccess:
                        `Un administrador de casos de ${consentBrand} puede comunicarse con usted o, para obtener asistencia ` +
                        `inmediata, comuníquese con ${consentBrand} al <span class="nowrap">${consentContactPhone}</span>`,
                    docName: 'Consentimiento del paciente',
                    preview: 'Vista previa'
                },
                availableServices: {
                    step: {
                        header: 'empecemos',
                        description:
                            'Estos son los medicamentos disponibles para los cuales puede verificar la cobertura de su paciente. Por favor, haz una selección para continuar. Proporcione información al paciente.'
                    },
                    availableServices: {
                        step: {
                            header: 'empecemos',
                            description:
                                'Estos son los medicamentos disponibles para los cuales puede verificar la cobertura de su paciente. Por favor, haz una selección para continuar. Proporcione información al paciente.'
                        },
                        serviceType: {
                            label: '¿Qué medicamento le gustaría verificar la cobertura?',
                            options: [
                                // Grouping medications to select into 5 count to reduce the clutter
                                // As per figma modeling
                                [
                                    { displayedString: 'GILENYA 0.25 MG 7 Capsules • NDC: 00078096589', valueString: '00078096589' },
                                    { displayedString: 'GILENYA 0.5 MG 30 Capsules • NDC: 00078060715', valueString: '00078060715' },
                                    { displayedString: 'GILENYA 0.5 MG 7 Capsules • NDC: 00078060789', valueString: '00078060789' },
                                    {
                                        displayedString: 'MAYZENT Starter Pack 12 x 0.25 MG Tablets • NDC: 00078097912',
                                        valueString: '00078097912'
                                    }
                                ],
                                [
                                    { displayedString: 'MAYZENT 0.25 MG 28 Tablets • NDC: 00078097950', valueString: '00078097950' },
                                    { displayedString: 'MAYZENT 2 MG 30 Tablets • NDC: 00078098615', valueString: '00078098615' }
                                ]
                            ]
                        },
                        action: {
                            submitBtn: 'Seguir',
                            cancelBtn: 'Cancelar'
                        }
                    },
                    cancelModal: {
                        title: '¡Espera!',
                        content:
                            'Si te vas ahora perderás toda la información anterior que has introducido. ¿Estás seguro de que quieres irte?',
                        yesLeave: 'Sí, vete',
                        noContinue: 'No, continuar'
                    }
                },
                prescriberNPIView: {
                    step: {
                        header: 'NPI del prescriptor',
                        description: 'Ingrese el nombre y apellido del prescriptor o el Identificador nacional del prescriptor (NPI) para buscar el proveedor que receta.'
                    },
                    body: {
                        pageHeader: 'Prescriptor',
                        textBoxPlaceholder: 'Ingrese el prescriptor npi # aquí',
                        invalidNpiMessage: 'Lo sentimos, no se han encontrado resultados. Por favor verifique su información y vuelva a intentarlo',
                        registeredNPI: 'Seleccione un prescriptor a continuación, busque nuevamente o seleccione el botón "Omitir este paso" a continuación para ingresar manualmente la información del prescriptor en la página siguiente.',
                        prescriberNameLink: 'Busque por nombre del prescriptor y código postal',
                        prescriberTextLink: 'No tiene número de NPI,',
                        prescriberNpiTextLink: 'Búsqueda por número de NPI del prescriptor'
                    },
                    info:{
                        firstName:'Nombre del prescriptor',
                        firstNameTextBoxPlaceholder: 'Ingrese el nombre del prescriptor aquí',
                        lastName:'Apellido del prescriptor',
                        lastNameTextBoxPlaceholder: 'Ingrese el apellido del prescriptor aquí',
                        zip:'Código postal',
                        zipTextBoxPlaceholder: 'Código postal de entrada',
                    },
                    action: {
                        submitBtn: 'Seguir',
                        cancelBtn: 'Cancelar',
                        skipLink: 'Saltear'
                    }
                },
                prescriberEmailSearch: {
                    emailUnregistered:
                        'Este correo electrónico es incorrecto o no se reconoce en nuestro sistema. Vuelva a ingresar o elija autenticar este NPI nuevamente respondiendo algunas preguntas aquí: Autenticación de KBA.',
                    kbaAuthenticationLinkText: 'KBA Authentication.'
                },
                prescriberNewNPI: {
                    step: {
                        header: 'Información del prescriptor',
                        description: 'Complete los pasos de verificación.'
                    }
                },
                prescriberInformation: {
                    dropdownPlaceholder: 'Select One',
                    step: {
                        header: 'Prescriber Information',
                        subHeader: '',
                        description:
                            'Please complete the following prescriber information to enroll your patient in XTANDI Support Solutions.',
                        required: { text: 'Please note: All fields denoted with an asterisk (*) are required.' },
                        back: 'Previous Step'
                    },
                    firstName: 'First Name',
                    lastName: 'Last Name',
                    sex: {
                        label: 'Gender',
                        option: [
                            { valueString: 'M', displayedString: 'Male' },
                            { valueString: 'F', displayedString: 'Female' }
                        ]
                    },
                    dob: 'Date of Birth',
                    address: 'Address',
                    addressLine2: 'Address Line 2',
                    city: 'City',
                    state: {
                        label: 'State'
                    },
                    postalCode: 'Zip Code',
                    preferredContactNumber: {
                        label: 'Preferred Contact Number',
                        option: [
                            { valueString: 'Home', displayedString: 'Home' },
                            { valueString: 'Mobile', displayedString: 'Mobile' }
                        ]
                    },
                    homePhone: 'Home Phone',
                    mobile: 'Mobile',
                    okToLeaveMessage: {
                        label: 'Ok to leave message',
                        option: [
                            { valueString: 'Y', displayedString: 'Yes' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    bestTimeToReachMe: {
                        label: 'Best time to reach me',
                        option: [
                            { valueString: 'Morning', displayedString: 'Morning' },
                            { valueString: 'Afternoon', displayedString: 'Afternoon' },
                            { valueString: 'Evening', displayedString: 'Evening' }
                        ]
                    },
                    emailAddress: 'Email Address',
                    dmdPrescriberName: 'DMD Prescriber Name',
                    alertCannotVerify: 'Based on the information entered, we are unable to verify your identity. Please try again.',
                    alertFBAError: 'An error occurred, please try again.',
                    actions: {
                        submitBtn: 'Continue'
                    }
                },
                cancelModal: {
                    title: '¡Espera!',
                    content:
                        'Si te vas ahora perderás toda la información anterior que has introducido. ¿Estás seguro de que quieres irte?',
                    yesLeave: 'Sí, vete',
                    noContinue: 'No, continuar'
                },
                providerAttestationView: {
                    step: {
                        header: 'Provider Attestation',
                        description: 'Please provide attestation to continue.',
                        requiredText: 'Important Safety Information',
                        back: 'Previous Step'
                    }
                },
                patientDemographics: {
                  step: {
                    header: 'WELCOME!',
                    description: `Additional information is needed from you in order to complete your NovoCare® enrollment.
                      To get started please provide the following patient information.`,
                    requiredText: '',
                    back: ''
                  },
                  body: {
                    header: 'PATIENT INFORMATION',
                    subheader: 'Please provide the following patient information.',
                    caregiverHeader: 'PRIMARY CAREGIVER INFORMATION',
                    caregiverSubheader: 'Please provide the following primary caregiver contact information to the extent applicable.',
                    firstName: 'First Name',
                    firstNamePlaceholder: 'Input patient first name here',
                    lastName: 'Last Name',
                    lastNamePlaceholder: 'Input patient last name here',
                    dob: 'Date of Birth',
                    dobPlaceholder: 'MM/DD/YYYY',
                    postalCode: 'Zip Code',
                    postalCodePlaceholder: 'Input patient zip code here',
                    patientPhone: 'Patient Phone',
                    patientPhonePlaceholder: '_ _ _-_ _ _-_ _ _ _',
                    caregiverFirstName: 'Primary Caregiver First Name',
                    caregiverFirstNamePlaceholder: `Input caregiver first name here`,
                    caregiverLastName: 'Primary Caregiver Last Name',
                    caregiverLastNamePlaceholder: `Input caregiver last name here`,
                    caregiverPhone: 'Primary Caregiver Phone',
                    caregiverPhonePlaceholder: `_ _ _-_ _ _-_ _ _ _`,
                    caregiverRelationshipToPatient: {
                        label: 'Relationship to Patient',
                        option: [
                            { valueString: 'Family Member', displayedString: 'Family Member' },
                            { valueString: 'Caregiver', displayedString: 'Caregiver' },
                            { valueString: 'Spouse', displayedString: 'Spouse' },
                            { valueString: 'Other', displayedString: 'Other' }
                        ],
                        dropdownPlaceHolder: 'Select one'
                    },
                    sex: {
                        label: 'Gender',
                        option: [
                            {
                                valueString: 'M',
                                displayedString: 'Male'
                            },
                            {
                                valueString: 'F',
                                displayedString: 'Female'
                            }
                        ]
                    },
                    demographicsInformation: `Enrollment is intended for individuals 18 years of age or older.
                        Any information collected on behalf of patients under 18 years of age must be provided by a legally authorized
                        caregiver and not from a minor themselves.`,
                    below18Information: `Based on the patient date of birth provided, this patient is under 18 years of age.
                        These fields are now required.`
                  },
                  action: {
                      submitBtn: 'Continuar',
                      cancelBtn: 'Cancelar'
                  }
                },
                pricingBenefit: {
                    step: {
                        header: 'Pricing Benefits',
                        description: 'Please continue through the steps to complete the coverage check.',
                        requiredText: 'Important Safety Information',
                        supportSubtitle: 'Additional Support Options',
                        supportDescription:
                            'Alongside MS is committed to providing the right support, right when your patients need it. We’ll adapt to your process and your schedule so you and your patients have clarity and know what to expect.',
                        supportLink: 'Co-pay Coverage',
                        supportSubDescription: 'Please unlock the patient’s coverage to understand if they qualify for this program.'
                    },
                    body: {
                        uploadDoc: {
                            uploadLabel: '¿Le gustaría subir alguna documentación de respaldo (tarjetas de seguro o notas clínicas)?',
                            documentHeader: 'Documentos cargados:',
                            documentTypeId: DocumentType.UploadedFileInsurance,
                            documentDescriptor: 'Archivo cargado (seguro)',
                            deleteButton: 'Borrar',
                            previewButton: 'Avance',
                            uploadButtonText: 'subir documentos'
                        }
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                prescriberEmail: {
                    step: {
                        header: 'Prescriber Email',
                        description: 'Please provide the email address that was linked to this provider registration',
                        requiredText: 'Important Safety Information',
                        back: 'Previous Step'
                    },
                    body: {
                        description:
                            'Please provide an email address. This email will be used to send notifications when this NPI is utilized to receive electronic benefit information.',
                        email: 'Email',
                        emailPlaceholder: 'Input your email in here',
                        incorrectEmailText:
                            'This email is either incorrect or is not recognized in our system. Please re-enter or choose to authenticate this NPI again by answering a few questions here:'
                    },
                    actions: {
                        continueButton: 'Continuar',
                        cancelButton: 'Cancelar',
                        skipLink: 'Saltear'
                    }
                },
                productSelection: {},
                chat: {
                    header: 'Now Chatting',
                    online: 'Need help?',
                    offline: 'Live Chat Offline'
                },
                needAssistance: {
                  title: 'Need Assistance?',
                  body: `Call $needAssistancePhoneNumber to contact NovoCare® Team <br> ${needAssistanceOfficeSchedule}`,
                  needAssistancePhoneNumberRb: '1-844-668-6732',
                  needAssistancePhoneNumberObes: '1-888-809-3942',
                  needAssistancePhoneNumberGrowth: '1-888-668-6444',
                  needAssistancePhoneNumberDefault: '1-833-885-3146',
                  footer: ''
                },
                snackbar: {
                    formError: 'Sorry, one or more of the required field(s) are not valid.',
                    patientNotFound:
                        'Our search did not find insurance information for this patient. Please click “OK” to continue and provide further information.'
                },
                documentUpload: {
                    step: {
                        header: 'Document Upload',
                        description: 'Please provide the following information to continue your patient\'s enrollment.',
                        back: 'PREVIOUS STEP'
                    },
                    actions: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel',
                        skipBtn: 'Skip step'
                    },
                    uploadDoc: {
                        uploadLabel:
                        {
                          label: 'Need to upload supporting documentation?',
                          tooltip: `Proof of Income may include: \n Pay Stubs (2 most current) \n Most recent year\'s tax return (1040) \n Copy of income documents \n Most recent W-2 or 1099 \n Unemployment Benefit Statement \n\n Coverage Denial Letters may \n include: letter from Medicaid, VA, \n Medicare Extra Help, etc.`
                        },
                        description:
                            'Please upload any supporting information that has been requested, such as: insurance card(s), proof of income or coverage denial letters.',
                        description2:
                            '<span>Please upload any supporting information <br> that has been requested, such as: insurance <br> cards, proof of income or coverage <br> denial letters.</span>',
                        description1: 'Do not include medical records',
                        restrictions: 'Files must be 20MB or less and in JPG, PNG or PDF format.',
                        documentHeader: 'Upload',
                        documentTypeId: DocumentType.UploadedFileInsurance,
                        documentDescriptor: 'Uploaded File (Insurance)',
                        deleteButton: 'Delete',
                        previewButton: 'Preview',
                        uploadButtonText: 'Upload',
                        fileSize: '(Files must be 20MB or less and in JPG, PNG, or PDF format)',
                        important: '<span>IMPORTANTE: La seguridad y protección de su información financiera personal <br/> es muy importante para nosotros. Los documentos financieros se almacenan de forma segura en nuestro sistema <br/> y, para su protección, lo alentamos a borrar cualquier referencia a los números de <br/> Seguridad Social, total o parcial, en todos los documentos suministrados.</span>',
                        importantMobile: '<span>IMPORTANTE: La seguridad y <br/> protección de su información financiera personal <br/> es muy importante para nosotros. <br/> Los documentos financieros se almacenan de forma segura <br/> en nuestro sistema y, para su protección, <br/> lo alentamos a borrar cualquier <br/> referencia a números de Seguro Social, <br/> total o parcial , en cualquier documento <br/> suministrado.</span>',
                    }
                },
                bifoldLayout: {
                    prescribingInformationLinkText: 'Prescribing Information',
                    prescribingInformationLinkUrl: 'https://www.avadel.com/assets/docs/lumryz-prescribing-information.pdf',
                    prescribingInformationDescription: '(Including BOXED Warning)',
                    importantSafetyInformationLinkText: 'Important Safety Information',
                    importantSafetyInformationLinkUrl: 'http://www.lumryzhcp.com/'
                },
                insuranceInformation: {
                    step: {
                        header: 'Datos demográficos del paciente',
                        description: 'Proporcione la siguiente información del paciente.',
                        requiredText: 'Informacion de Seguridad Importante',
                        back: 'Paso anterior'
                    },
                    static: {
                        completeMessage:
                            'Haga clic en "Continuar" para completar la solicitud del Programa de asistencia ' +
                            'al paciente (PAP) de Astellas para este paciente.',
                        noInsuranceError:
                            'Nuestra búsqueda no encontró información de seguro para este paciente. Haga clic en "Aceptar" para continuar y proporcionar más información.',
                        unableToFindInsurance: 'No pudimos encontrar información de seguro para este paciente.',
                        foundInsuranceMessage: 'Parece que encontramos información de seguro para este paciente.',
                        insuranceInfoText: 'Información de seguro de farmacia',
                        viewInfoText: 'Ver información',
                        uploadedDocs: {
                            uploadLabel: `Por favor, cargue las imágenes del anverso y el reverso de cualquier tarjeta de seguro de farmacia relevante:`,
                            uploadLabelInsurance: `Cargue cualquier tarjeta de seguro relevante:`,
                            description: '',
                            restrictions: 'Los archivos deben tener 20 MB o menos y estar en formato JPG, PNG o PDF.',
                            documentHeader: 'Subir',
                            documentTypeId: DocumentType.UploadedFileInsurance,
                            documentDescriptor: 'Archivo cargado (seguro)',
                            deleteButton: 'Borrar',
                            previewButton: 'Avance',
                            uploadButtonText: 'Subir',
                            fileSize: 'Los archivos deben tener 20 MB o menos y estar en formato JPG, PNG o PDF',
                            required: null
                        },
                        uploadedDocsInsurance: {
                            uploadLabel: `Cargue cualquier tarjeta de seguro relevante:`,
                            description: '',
                            restrictions: 'Los archivos deben tener 20 MB o menos y estar en formato JPG, PNG o PDF.',
                            documentHeader: 'Subir',
                            documentTypeId: DocumentType.UploadedFileInsurance,
                            documentDescriptor: 'Archivo cargado (seguro)',
                            deleteButton: 'Borrar',
                            previewButton: 'Avance',
                            uploadButtonText: 'Subir',
                            fileSize: 'Los archivos deben tener 20 MB o menos y estar en formato JPG, PNG o PDF',
                            required: null
                        },
                        viewInsuranceModal: {
                            viewInsuranceTitle: 'Información del seguro',
                            insurancePlanType: 'Tipo de plan de seguro',
                            pbmName: 'Nombre del seguro',
                            placeholderPbmName: 'Ingrese el nombre del seguro aquí',
                            pbmPhone: 'Número de teléfono del seguro',
                            placeholderPbmPhone: 'Ingrese el número de teléfono del seguro aquí',
                            policyIDNumber: 'Número de la póliza',
                            placeholderPolicyIDNumber: 'Ingrese el número de póliza aquí',
                            groupNumber: 'Número de grupo',
                            placeholderGroupNumber: 'Ingrese el número de grupo aquí',
                            binNumber: 'Número de BIN',
                            pcnNumber: 'Número de PCN',
                            policyholderRelationshipToPatient: 'Relación del asegurado con el paciente',
                            policyholderDateOfBirth: 'Titular de la póliza Fecha de nacimiento',
                            policyholderFirstName: 'Nombre del titular de la póliza',
                            placeholderPolicyholderFirstName: 'Ingrese el nombre aquí',
                            policyholderLastName: 'Apellido del titular de la póliza',
                            placeholderPolicyholderLastName: 'Ingrese el apellido aquí',
                        }
                    },
                    isInformationCorrect: {
                        label: '¿Es correcta esta información?',
                        option: [
                            { valueString: 'Y', displayedString: 'Sí' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    hasInsurance: {
                        label: '¿Esta paciente tiene seguro de farmacia?',
                        option: [
                            { valueString: 'Y', displayedString: 'Sí' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    wantToUpload: {
                        label: '¿Le gustaría subir una imagen de la(s) tarjeta(s) de seguro?',
                        option: [
                            { valueString: 'Y', displayedString: 'Sí' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    form: {
                        insurancePlanType: {
                            label: 'Tipo de seguro',
                            option: [
                                { valueString: 'medical', displayedString: 'Medico' },
                                { valueString: 'pharmacy', displayedString: 'Farmacia' }
                            ],
                            dropdownPlaceHolder: 'Seleccione uno'
                        },
                        pbmName: 'Nombre del seguro',
                        placeholderPbmName: 'Ingrese el nombre del seguro aquí',
                        pbmPhoneNumber: 'Número de teléfono del seguro',
                        placeholderPbmPhoneNumber: 'Ingrese el número de teléfono del seguro aquí',
                        policyIdNumber: 'Número del titular de la póliza',
                        placeholderPolicyIDNumber: 'Ingrese el número de póliza aquí',
                        groupNumber: 'Número de grupo',
                        placeholderGroupNumber: 'Ingrese el número de grupo aquí',
                        binNumber: 'Número de BIN',
                        pcnNumber: 'Número PCN',
                        policyholderRelationshipToPatient: {
                            label: 'Relación del asegurado con el paciente',
                            option: [
                                { valueString: 'self', displayedString: 'Uno mismo' },
                                { valueString: 'spouse', displayedString: 'Esposo' },
                                { valueString: 'parent', displayedString: 'Madre / Padre' },
                                { valueString: 'child', displayedString: 'Niña / Niño' },
                                { valueString: 'unknown', displayedString: 'Desconocida' },
                                { valueString: 'otherRelationship', displayedString: 'Otra relación' }
                            ],
                            dropdownPlaceHolder: 'Seleccione uno'
                        },
                        policyholderDateOfBirth: 'Titular de la póliza Fecha de nacimiento',
                        policyholderFirstName: 'Nombre del titular de la póliza',
                        placeholderPolicyholderFirstName: 'Ingrese el nombre aquí',
                        policyholderLastName: 'Apellido del titular de la póliza',
                        placeholderPolicyholderLastName: 'Ingrese el apellido aquí',
                        view: {
                            header:
                                'Si su paciente tiene un plan de seguro de farmacia que no sea el mencionado anteriormente, ' +
                                'por favor ingrese la información del plan a continuación.'
                        }
                    },
                    hasSecondaryInsurance: {
                        label: '¿Tiene el paciente algún otro Seguro de Farmacia?',
                        option: [
                            { valueString: 'Y', displayedString: 'Sí' },
                            { valueString: 'N', displayedString: 'No' }
                        ]
                    },
                    actions: {
                        submitBtn: 'Continuar',
                        cancelBtn: 'Cancelar'
                    }
                },
                patientAuthorization: {
                    snackbarErrorForConsent: 'Sorry, one or more of the required field(s) are missing.',
                    snackbarErrorPattern: 'Sorry, one or more of the required fields(s) are not valid',
                    snackbarErrorField: 'Sorry, one or more of the required field(s) are missing.',
                    snackbarErrorScroll: `Sorry, the authorization box must be read by scrolling to the bottom of the box
                      before selecting any of the checkboxes.`,
                    snackbarErrorDocumentUpload: `Document upload failed
                      (file size cannot exceed 20MB and must be in JPG, PNG, or PDF format)`,
                    dropdownPlaceholder: 'Select One',
                    step: {
                        header: 'Patient Authorization',
                        subHeader: '',
                        description:
                            `Next, please provide consent to continue. If the patient is under the age of 18, a parent or legal representative must provide consent.`,
                        requiredText:
                            ''
                    },
                    isPresent: {
                        label: 'Is the patient or legal representative present to authorize?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes, patient is present.' },
                            { valueString: 'No', displayedString: 'No, patient is not present. Please contact the patient for consent.' },
                            { valueString: 'Skip', displayedString: 'Skip, patient has already provided consent.' }
                        ]
                    },
                    authorizationOption: {
                        label: 'What do you want to do today?',
                        option: [
                            { valueString: 'PAuth', displayedString: 'Provide Novocare® Program Authorization' },
                            { valueString: 'PAP', displayedString: 'Provide Patient Assistance Program (PAP) Authorization' },
                            { valueString: 'Both', displayedString: 'Provide both Novocare® Program and Patient Assistance Program Authorization' },
                        ]
                    },
                    whoIsAuthorizing: {
                        label: 'Who is authorizing?',
                        option: [
                            { valueString: 'Patient', displayedString: 'Patient' },
                            { valueString: 'Legal Representative', displayedString: 'Legal Representative' }
                        ]
                    },
                    legalDiscloser:
                        'If signed by someone other than the patient, please describe your legal authority/power of attorney to sign on behalf of the patient (e.g. guardian, custodian, healthcare power of attorney). Please note that if you are the patient&lsquo;s prescriber, that alone does not give you legal authority to sign on behalf of the patient.',
                    legalRepFullName: 'Legal Representative First and Last Name',
                    relationToPatient: {
                        label: 'Relationship to Patient',
                        option: [
                            { valueString: 'AltContact', displayedString: 'Alternate Contact' },
                            { valueString: 'Caretaker', displayedString: 'Caretaker' },
                            { valueString: 'PowerOfAttorney', displayedString: 'Power of Attorney' },
                        ]
                    },
                    hipaaConsent:{
                        label:'NovoCare® Program and HIPAA Authorization',
                        options: [
                            {
                                valueString: 'hipaa',
                                displayedString:
                                    'I agree to the NovoCare® Program and HIPAA Authorization Statement'
                            }
                        ],
                        rareBloodContent:`I (or my parent/guardian/legal representative) hereby give permission for my (or the patient’s) health care providers, pharmacies, service providers and their contractors, health plans, and health insurer(s) and their contractors, to disclose any and all necessary information, including, but not limited to, prescription coverage, medical prescriptions, medical condition, and health records (“Personal Information”) to Novo Nordisk’s NovoCare®. I also give permission for NovoCare to contact me regarding the program. <br> <br>
                        This Personal Information aids in administering the program "NovoCare®" by: (i) processing this Application; (ii) verifying my information; (iii) identifying and/or determining eligibility under NovoCare® and other patient assistance resources; (iv) investigating and verifying my insurance benefits; (v) coordinating the dispensing and delivery of medication; (vi) conducting additional services to run NovoCare® ; and (vii) conducting quality assurance and/or other internal business activities in connection with NovoCare® . <br> <br>
                        I (or my parent/guardian/legal representative) further give permission to NovoCare® to use and disclose my (or the patient’s) Personal Information to Health Care Providers, Insurer(s), caregivers, Novo Nordisk, its affiliates, service providers, and agents (collectively “Novo Nordisk”), for the purposes described above. <br> <br>
                        I (or my parent/guardian/legal representative) understand and acknowledge that while NovoCare®, Novo Nordisk, and any authorized contractors acting on their behalf will make every effort to keep Personal Information private, once Personal Information is disclosed it may no longer be protected by federal privacy and security laws or applicable state laws. Specifically, I (or my parent/guardian/legal representative) acknowledge that once disclosed, Personal Information may be legally re-disclosed by authorized recipients unless otherwise prohibited by law. <br> <br>
                        I (or my parent/guardian/legal representative) understand that this authorization may be refused. I (or my parent/guardian/legal representative) may also revoke (withdraw) this NovoCare® authorization at any time in the future by calling 1-844-668-6732 or writing to NovoCare® 501 W. Church St. #405, Orlando,FL 32805. Such refusal or future revocation will not affect my (or the patient’s) commencement or continuation of treatment by healthcare providers, pharmacies, service providers, insurer(s), etc. However, if I (or my parent/guardian/legal representative) revoke this authorization, there can be no further participation in the programs and/or services administered by NovoCare®. <br> <br>
                        If I (or my parent/guardian/legal representative) revoke this authorization, NovoCare® will stop using or sharing my (or the patient’s) Personal Information (except as necessary to end participation) but such revocation will not affect uses and disclosures of Personal Information previously disclosed in reliance upon this authorization. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may receive a copy of this authorization which will remain valid for so long as necessary to facilitate the NovoCare® Program unless a shorter time period is required by federal or state law. I (or my parent/guardian/legal representative) also understand that NovoCare® may change or end at any time without prior notification.`,
                        obesityContent:`I (or my parent/guardian/legal representative) hereby give permission for my (or the patient’s) health care providers, pharmacies, service providers and their contractors, health plans, and health insurer(s) and their contractors, to disclose any and all necessary information, including, but not limited to, prescription coverage, medical prescriptions, medical condition, and health records (“Personal Information”) to Novo Nordisk’s NovoCare®. I also give permission for NovoCare to contact me regarding the program. <br> <br>
                        This Personal Information aids in administering the program "NovoCare®" by: (i) processing this Application; (ii) verifying my information; (iii) identifying and/or determining eligibility under NovoCare® and other patient assistance resources; (iv) investigating and verifying my insurance benefits; (v) coordinating the dispensing and delivery of medication; (vi) conducting additional services to run NovoCare® ; and (vii) conducting quality assurance and/or other internal business activities in connection with NovoCare® . <br> <br>
                        I (or my parent/guardian/legal representative) further give permission to NovoCare® to use and disclose my (or the patient’s) Personal Information to Health Care Providers, Insurer(s), caregivers, Novo Nordisk, its affiliates, service providers, and agents (collectively “Novo Nordisk”), for the purposes described above. <br> <br>
                        I (or my parent/guardian/legal representative) understand and acknowledge that while NovoCare®, Novo Nordisk, and any authorized contractors acting on their behalf will make every effort to keep Personal Information private, once Personal Information is disclosed it may no longer be protected by federal privacy and security laws or applicable state laws. Specifically, I (or my parent/guardian/legal representative) acknowledge that once disclosed, Personal Information may be legally re-disclosed by authorized recipients unless otherwise prohibited by law. <br> <br>
                        I (or my parent/guardian/legal representative) understand that this authorization may be refused. I (or my parent/guardian/legal representative) may also revoke (withdraw) this NovoCare® authorization at any time in the future by calling 1-888-809-3942 or writing to NovoCare® 501 W. Church St. #405, Orlando,FL 32805. Such refusal or future revocation will not affect my (or the patient’s) commencement or continuation of treatment by healthcare providers, pharmacies, service providers, insurer(s), etc. However, if I (or my parent/guardian/legal representative) revoke this authorization, there can be no further participation in the programs and/or services administered by NovoCare®. <br> <br>
                        If I (or my parent/guardian/legal representative) revoke this authorization, NovoCare® will stop using or sharing my (or the patient’s) Personal Information (except as necessary to end participation) but such revocation will not affect uses and disclosures of Personal Information previously disclosed in reliance upon this authorization. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may receive a copy of this authorization which will remain valid for so long as necessary to facilitate the NovoCare® Program unless a shorter time period is required by federal or state law. I (or my parent/guardian/legal representative) also understand that NovoCare® may change or end at any time without prior notification.`,
                        growthContent:`I (or my parent/guardian/legal representative) hereby give permission for my (or the patient’s) health care providers, pharmacies, service providers and their contractors, health plans, and health insurer(s) and their contractors, to disclose any and all necessary information, including, but not limited to, prescription coverage, medical prescriptions, medical condition, and health records (“Personal Information”) to Novo Nordisk’s NovoCare®. I also give permission for NovoCare to contact me regarding the program. <br> <br>
                        This Personal Information aids in administering the program "NovoCare®" by: (i) processing this Application; (ii) verifying my information; (iii) identifying and/or determining eligibility under NovoCare® and other patient assistance resources; (iv) investigating and verifying my insurance benefits; (v) coordinating the dispensing and delivery of medication; (vi) conducting additional services to run NovoCare® ; and (vii) conducting quality assurance and/or other internal business activities in connection with NovoCare® . <br> <br>
                        I (or my parent/guardian/legal representative) further give permission to NovoCare® to use and disclose my (or the patient’s) Personal Information to Health Care Providers, Insurer(s), caregivers, Novo Nordisk, its affiliates, service providers, and agents (collectively “Novo Nordisk”), for the purposes described above. <br> <br>
                        I (or my parent/guardian/legal representative) understand and acknowledge that while NovoCare®, Novo Nordisk, and any authorized contractors acting on their behalf will make every effort to keep Personal Information private, once Personal Information is disclosed it may no longer be protected by federal privacy and security laws or applicable state laws. Specifically, I (or my parent/guardian/legal representative) acknowledge that once disclosed, Personal Information may be legally re-disclosed by authorized recipients unless otherwise prohibited by law. <br> <br>
                        I (or my parent/guardian/legal representative) understand that this authorization may be refused. I (or my parent/guardian/legal representative) may also revoke (withdraw) this NovoCare® authorization at any time in the future by calling 1-888-668-6444 or writing to NovoCare® 501 W. Church St. #405, Orlando,FL 32805. Such refusal or future revocation will not affect my (or the patient’s) commencement or continuation of treatment by healthcare providers, pharmacies, service providers, insurer(s), etc. However, if I (or my parent/guardian/legal representative) revoke this authorization, there can be no further participation in the programs and/or services administered by NovoCare®. <br> <br>
                        If I (or my parent/guardian/legal representative) revoke this authorization, NovoCare® will stop using or sharing my (or the patient’s) Personal Information (except as necessary to end participation) but such revocation will not affect uses and disclosures of Personal Information previously disclosed in reliance upon this authorization. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may receive a copy of this authorization which will remain valid for so long as necessary to facilitate the NovoCare® Program unless a shorter time period is required by federal or state law. I (or my parent/guardian/legal representative) also understand that NovoCare® may change or end at any time without prior notification.`,
                        disclaimer: 'You must read the above text by scrolling to the bottom of the box before opting in.'
                    },
                    tcpaConsent:{
                        label:'NovoCare® Telephone Consumer Protection Act [TCPA] Authorization (Optional)',
                        options: [
                            {
                                valueString: 'tcpa',
                                displayedString:
                                    'I agree to the Telephone Consumer Protection Act [TPCA] Communication Authorization statement'
                            }
                        ],
                        content:`I (or my parent/guardian/legal representative) also agree to be contacted by NovoCare® and others on its behalf by telephone calls made by or using an automated dialing system or pre-recorded messages at the number(s) provided in this Application, for all non-marketing purposes. I (or my parent/guardian/legal representative) understand that I (or my parent/guardian/legal representative) may be asked to provide my (or the patient’s) zip code and date of birth during pre-recorded calls in order to verify my (or the patient’s) identity and that this information will not be retained by NovoCare® or its partners but is simply to verify identity. I (or my parent/guardian/legal representative) agree to notify NovoCare® promptly if any of my numbers or addresses change in the future. I (or my parent/guardian/legal representative) understand that this consent is not required, or a condition of purchase and it can be revoked at any time. I (or my parent/guardian/legal representative) further understand that I (or my parent/guardian/legal representative) can review the full Novo Nordisk Privacy Policy at https://www.novonordisk-us.com/privacy-notice.html.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                    },
                    smsConsent:{
                        label:'NovoCare® SMS Texting Authorization (Optional)',
                        options: [
                            {
                                valueString: 'sms',
                                displayedString:
                                    'Opt in for Text Messaging'
                            }
                        ],
                        content:`Yes, I have read and understand the NovoCare® SMS Terms of Use below and realize that Novo Nordisk or its partners may use my information to provide me with program status updates, quality monitoring, and as more fully explained in Novo Nordisk’s Privacy Notice. I understand any calls or texts may be generated using an automated technology and I do not have to consent to receive communications via telephone or text messaging before purchasing goods or receiving other services from Novo Nordisk.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        termsOfUseLink:'https://www.novocare.com/eligibility/NovoCare-Text.html',
                        termsOfUseLinkText:'Terms of Use'
                    },
                    marketingMsgConsent:{
                        label:'NovoCare® Marketing Messaging Authorization (Optional)',
                        options: [
                            {
                                valueString: 'marketingMsg',
                                displayedString:
                                    'Opt in for Marketing Materials'
                            }
                        ],
                        rareBloodContent:`I agree that the information I provide may also be used by Novo Nordisk, its affiliates, or vendors to keep me informed about new products, services, special offers, or other opportunities that may be of interest to me, as they become available.
                        These communications may contain material marketing or advertising Novo Nordisk products, goods, or services. I understand that I do not have to consent to receive communications before purchasing goods or receiving other services from Novo Nordisk. Novo Nordisk will take reasonable measures to protect my information. I can stop Novo Nordisk from sending me future communications by clicking the “unsubscribe” link within any email you receive, by calling 1-877-744-2579, or by sending us a letter containing your full contact information (e.g., name, email address, phone) to Novo Nordisk, 800 Scudders Mill Road, Plainsboro, New Jersey 08536.`,
                        obesityContent:`I agree that the information I provide may also be used by Novo Nordisk, its affiliates, or vendors to keep me informed about new products, services, special offers, or other opportunities that may be of interest to me, as they become available.
                        These communications may contain material marketing or advertising Novo Nordisk products, goods, or services. I understand that I do not have to consent to receive communications before purchasing goods or receiving other services from Novo Nordisk. Novo Nordisk will take reasonable measures to protect my information. I can stop Novo Nordisk from sending me future communications by clicking the “unsubscribe” link within any email you receive, by calling 1-877-744-2579, or by sending us a letter containing your full contact information (e.g., name, email address, phone) to Novo Nordisk, 800 Scudders Mill Road, Plainsboro, New Jersey 08536.`,
                        growthContent:`I agree that the information I provide may also be used by Novo Nordisk, its affiliates, or vendors to keep me informed about new products, services, special offers, or other opportunities that may be of interest to me, as they become available.
                        These communications may contain material marketing or advertising Novo Nordisk products, goods, or services. I understand that I do not have to consent to receive communications before purchasing goods or receiving other services from Novo Nordisk. Novo Nordisk will take reasonable measures to protect my information. I can stop Novo Nordisk from sending me future communications by clicking the “unsubscribe” link within any email you receive, by calling 1-877-744-2579, or by sending us a letter containing your full contact information (e.g., name, email address, phone) to Novo Nordisk, 800 Scudders Mill Road, Plainsboro, New Jersey 08536.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.'
                    },
                    fcraConsent:{
                        label: `NovoCare® Income Verification Fair Credit Reporting Act [FCRA] <br>
                        Authorization for the Patient Assistance Program`,
                        options: [
                            {
                                valueString: 'fcra',
                                displayedString:
                                    'I agree to the NovoCare® Income Verification Fair Credit Reporting Act [FCRA] <br> Authorization for the Patient Assistance Program'
                            }
                        ],
                        content:`I understand that I am providing “written instructions” under the Fair Credit Reporting Act (“FCRA”), authorizing NovoCare®, Novo Nordisk, and its authorized vendor(s) on an on-going basis as needed for the duration of my participation in programs administered by Novo Nordisk NovoCare®, to obtain information from my credit profile or other information from the vendor through e-income verification which will include a soft credit check solely for the purpose of determining financial qualifications for programs administered by Novo Nordisk. <br> <br>
                        I understand that I must affirmatively agree to these terms in order to proceed in this financial screening process. I promise that any information, including financial and insurance information that I provide, is complete and true. I also understand that I may need to provide additional documentation and that additional eligibility requirements apply for Novo Nordisk Patient Assistance Program.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        tooltip: 'NovoCare® will only utilize the e-income verification tool if the patient\'s eligibility for Patient Assistance Program (PAP) needs to be evaluated. PAP provides free drug to patients who meet eligibility requirements.'
                    },
                    PapAuthorization:{
                        label: 'PATIENT ASSISTANCE PROGRAM AUTHORIZATIONS',
                        subText: 'Please ONLY complete this section if patient is applying to PAP'
                    },
                    asstProgAuthConsent:{
                        label:'NovoCare® Patient Assistance Program Authorization',
                        options: [
                            {
                                valueString: 'asstProgAuth',
                                displayedString:
                                    'I agree to the NovoCare® Patient Assistance Program Authorization Statement'
                            }
                        ],
                        rareBloodContent:`I (or my parent/guardian/legal representative) hereby certify that I (or my parent/guardian/legal representative): (i) am over 18; (ii) am a United States citizen or legal resident; (iii) do not have the ability to pay for the medication(s) requested by my (or the patient’s) health care provider prescription(s.) I authorize NovoCare® to determine if I am eligible for the program. Patient Assistance Program requirements can be found at NovoCare.com or call 1-844-668-6732. <br> <br>
                        I also certify that I am not enrolled in or eligible for any of the following: (i) Medicaid; (ii) Medicare Extra Help/Low Income Subsidy (“LIS”); (iii) federally funded insurance programs, with the exception of Medicare Part D; or (iv) receive prescription drug benefits throughout the U.S. Veterans Administration, other than Medicare Part D. Patients enrolled in Medicare Part D who satisfy the financial eligibility criteria qualify for the program, but once enrolled, must stay in the program through the end of the calendar year. <br> <br>
                        I certify that (i) all information provided is true and correct and that I (or my parent/guardian/legal representative) will verify any of the information provided to PAP upon request; (ii) will verify my (or the patient’s) application status and receipt of the indicated medication(s) upon request by PAP; (iii) if approved to participate in PAP, I (or my parent/guardian/legal representative) will not seek reimbursement for the medication(s) requested from any government program or third-party insurer; and (iv) will comply with any insurance carrier disclosure requirements, including my participation in PAP. I give permission for Novo Nordisk (and its authorized partners) to contact me about my PAP application at any time. <br> <br>
                        Lastly, I (or my parent/guardian/legal representative) understand and agree: (i) my eligibility to participate in PAP is subject to Novo Nordisk’s decision and that Novo Nordisk may modify or terminate PAP at any time; (ii) I may be required to provide proof of ineligibility for certain other prescription drug coverage programs in order to meet the eligibility requirements for PAP; and (iii) I am required to report any changes to my health insurance and prescription drug coverage to PAP. <br> <br>
                        I (or my parent/guardian/legal representative) understands that the product received through the PAP is provided to me free of charge and that I have no obligation to purchase the product due to my participation in the PAP.  I (or my parent/guardian/legal representative) also give permission to PAP to combine or aggregate any information collected about me with information PAP may collect from other sources for the purpose of providing or administering PAP. <br> <br>
                        If a safety concern is reported, I (or my parent/guardian/legal representative) give permission to share my personal information to Novo Nordisk, who may contact me with follow-up inquiries, and who may report my personal information to the health authorities to comply with applicable rules and regulations.`,
                        growthContent:`I (or my parent/guardian/legal representative) hereby certify that I (or my parent/guardian/legal representative): (i) am over 18; (ii) am a United States citizen or legal resident; (iii) do not have the ability to pay for the medication(s) requested by my (or the patient’s) health care provider prescription(s.) I authorize NovoCare® to determine if I am eligible for the program. Patient Assistance Program requirements can be found at NovoCare.com or call 1-888-668-6444. <br> <br>
                        I also certify that I am not enrolled in or eligible for any of the following: (i) Medicaid; (ii) Medicare Extra Help/Low Income Subsidy (“LIS”); (iii) federally funded insurance programs, with the exception of Medicare Part D; or (iv) receive prescription drug benefits throughout the U.S. Veterans Administration, other than Medicare Part D. Patients enrolled in Medicare Part D who satisfy the financial eligibility criteria qualify for the program, but once enrolled, must stay in the program through the end of the calendar year. <br> <br>
                        I certify that (i) all information provided is true and correct and that I (or my parent/guardian/legal representative) will verify any of the information provided to PAP upon request; (ii) will verify my (or the patient’s) application status and receipt of the indicated medication(s) upon request by PAP; (iii) if approved to participate in PAP, I (or my parent/guardian/legal representative) will not seek reimbursement for the medication(s) requested from any government program or third-party insurer; and (iv) will comply with any insurance carrier disclosure requirements, including my participation in PAP. I give permission for Novo Nordisk (and its authorized partners) to contact me about my PAP application at any time. <br> <br>
                        Lastly, I (or my parent/guardian/legal representative) understand and agree: (i) my eligibility to participate in PAP is subject to Novo Nordisk’s decision and that Novo Nordisk may modify or terminate PAP at any time; (ii) I may be required to provide proof of ineligibility for certain other prescription drug coverage programs in order to meet the eligibility requirements for PAP; and (iii) I am required to report any changes to my health insurance and prescription drug coverage to PAP. <br> <br>
                        I (or my parent/guardian/legal representative) understands that the product received through the PAP is provided to me free of charge and that I have no obligation to purchase the product due to my participation in the PAP.  I (or my parent/guardian/legal representative) also give permission to PAP to combine or aggregate any information collected about me with information PAP may collect from other sources for the purpose of providing or administering PAP. <br> <br>
                        If a safety concern is reported, I (or my parent/guardian/legal representative) give permission to share my personal information to Novo Nordisk, who may contact me with follow-up inquiries, and who may report my personal information to the health authorities to comply with applicable rules and regulations.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        tooltip: 'NovoCare® Patient Assistance Program (PAP) is free and provides medication to eligible applicants at no charge. If the applicant qualifies under the Novo Nordisk PAP guidelines, the prescribed dose of the requested medication(s) will be shipped to the patient\'s home.'
                    },
                    medEnrollAuthConsent:{
                        label: 'NovoCare® Patient Medicare Part D Enrollee Authorization ',
                        options: [
                            {
                                valueString: 'medEnrollAuth',
                                displayedString:
                                    'I agree to the NovoCare® Patient Medicare Part D Enrollee Authorization <br> for the Patient Assistance Program'
                            }
                        ],
                        content:`I (or my parent/guardian/legal representative agree that if I am (or the patient is) approved for PAP as a Part D Enrollee, that I will provide Novo Nordisk with my Part D plan information, including Plan name, Plan ID, Group Number, and Plan address and other contact information. I will provide this information so that NovoCare® can notify my Medicare Part D Plan what specific medication I have been prescribed and am receiving under Novo Nordisk’s free drug program, and can further advise the Plan that I  will not seek coverage for these products under the Medicare Part D prescription drug insurance plan and will not apply any Novo Nordisk PAP medication towards my True-Out-Of-Pocket (TrOOP) costs.`,
                        disclaimer:'You must read the above text by scrolling to the bottom of the box before opting in.',
                        tooltip: 'tooltiptext'
                    },
                    textMessagingConsent:{
                        label:'Text Messaging Consent',
                        content:`I acknowledge that by checking the Text Messaging Consent box below, I expressly consent to receive text messages or automated calls from or on behalf of Sanofi at the mobile phone number(s) that I provide. I confirm that I am the subscriber for the mobile phone number(s) provided, and I agree to notify Sanofi promptly if any of my number(s) change in the future. I understand that my wireless service provider’s message and data rates may apply to any text messages that I receive from or on behalf of Sanofi at the mobile phone number(s) that I provide. I understand that I can opt out of future text messages at any time. To opt out of receiving texts, I understand that I should reply “STOP” to 833-930-2575. <br/><br/>
                        I understand that my consent to receiving text messages from or on behalf of Sanofi is not required as a condition of purchasing any goods or services from Sanofi or its affiliates.<br/>`,
                        checkBoxLabel:'By checking this box, I acknowledge that I have read and understand the Text Messaging Consent and agree to its terms.'
                    },
                    patientConsentAndCertifications:{
                        label:'Patient Consent and Certifications',
                        content:'I hereby authorize Sanofi and its affiliates and agents to provide services to me under the CareASSIST Patient Support Program, as described in this form and as may be supplemented in the future. Such services may include: determining if I am eligible to enroll in and/ or receive services from CareASSIST, including access and reimbursement assistance services, patient assistance programs, and resource services; investigating my health insurance coverage benefits; providing information on prior authorizations and appeals of denied claims for coverage/reimbursement; referring me to, or determining my eligibility for, other programs and/or alternate sources of funding; and providing information on other independent support services that may be available to me (together, the “Services”). If enrolling in the CareASSIST Patient Assistance Program, which provides free medication to eligible patients from Sanofi Cares North America, I certify that the number of people in my household and my household income provided on the Income Verification step are true and accurate to the best of my knowledge. To qualify for the CareASSIST Patient Assistance Program, I understand that I must meet certain income and other eligibility requirements. Further, I understand that I am authorizing Sanofi and its affiliates and agents under the Fair Credit Reporting Act to use my date of birth and/or additional demographic information to access and obtain information from my personal credit profile, as well as use information derived from public and other sources, to estimate my income in conjunction with the eligibility determination process. Continuation in the program is conditional upon timely verification of income. If requested, I agree to provide CareASSIST with proof of income within thirty (30) days of the request. I agree to immediately inform CareASSIST and my doctor/healthcare provider if my income or insurance status changes during the course of my participation in the CareASSIST Patient Assistance Program. If enrolling in the CareASSIST Copay Program, I agree to my enrollment in such program if confirmed as eligible. I understand that copay information will be sent to my physician or the designated specialty pharmacy, and any assistance with my applicable cost-sharing or copayment for each medication selected by my prescriber will be made in accordance with the Program terms and conditions. I understand that I may be contacted by Sanofi in the event that I report an adverse event. I authorize Sanofi and its affiliates and agents to contact me by mail, telephone (including calls made with an automatic telephone dialing system or a prerecorded voice), or email with information about CareASSIST, Sanofi products, my condition, promotions, services, and research studies, and to ask my opinion about such information and topics, including market research and disease-related surveys (“The Communications”). I understand that the frequency of these messages will vary. I understand and acknowledge that communications transmitted via unencrypted email or over an open network may be inherently unsecure, and there is no assurance of confidentiality for information communicated in this manner. I understand that I do not have to enroll in CareASSIST or receive The Communications and that I can still receive Sanofi products as prescribed by my physician. I may opt out of receiving Communications and/or individual Services, including the CareASSIST Patient Assistance Program, or opt out of CareASSIST entirely at any time by notifying a CareASSIST representative by telephone at 1-833-WE+CARE (1-833-930-2273) or by sending a letter to CareASSIST, 450 Water St., 3rd Floor, Cambridge, MA 02141. I also understand that the Services may be revised, changed, or terminated at any time.',
                        checkBoxLabel:'I have read and agree to the patient consent and certifications.'
                    },
                    patientAuthorizationStatement: {
                        label: 'Patient Authorization to Disclose Information',
                        content: `I authorize my healthcare providers and staff; my health insurer, health plan, or programs that provide me healthcare benefits (together, “Health Insurers”); and any specialty pharmacies that dispense my medication to disclose to Sanofi, and its affiliates and agents, health information about me, including patient-related information provided throughout this form and related to my medical condition, treatment with prescribed Sanofi therapies, health insurance coverage, claims, prescriptions, and referral to and enrollment in the CareASSIST Patient Support Program and Copay Program (together, “My Information”). My healthcare providers, Health Insurers, specialty pharmacies, and Sanofi (including its agents and affiliates) may use and disclose My Information for the purposes of providing certain support services, including: to determine if I am eligible to enroll in and/or receive services from CareASSIST, including access and reimbursement assistance services, patient financial assistance programs, and resource services; for the operation and administration of CareASSIST; to investigate my health insurance coverage benefits; to assist with prior authorization for coverage/ reimbursement; to assist with the status of appeals of denied claims for coverage/reimbursement; and to refer me to, or to determine eligibility for, other programs and/or alternate sources of funding—such as Medicaid, healthcare exchanges, Medigap, state pharmaceutical assistance programs (SPAPs), and charitable foundations— that may be available to assist me with the costs of my medications. I further authorize Sanofi and its affiliates and agents to de-identify my health information and use it in performing research, education, business analytics, and marketing studies, or for other commercial purposes, including linkage with other de-identified information Sanofi may receive from other sources. I understand that Sanofi and its affiliates and agents may share My Information, including identifiable health information, among themselves in order to de-identify it for these purposes and as needed to perform the Services or to send the Communications. I understand and agree that Sanofi and its affiliates and agents may use My Information for these purposes and may share My Information with my doctors, specialty pharmacies, and Health Insurers. I understand and agree that my healthcare providers, Health Insurers, and specialty pharmacies may receive remuneration from Sanofi in exchange for disclosing My Information to Sanofi and/or for providing me with support services in connection with CareASSIST. Once My Information has been disclosed to Sanofi, I understand that federal privacy laws may no longer protect it from further disclosure. However, Sanofi agrees to protect My Information by using and disclosing it only for the purposes authorized in this authorization or as otherwise required by law. I understand that I may have certain rights under applicable data privacy laws regarding My Information, including the right to access My Information held by Sanofi. For further information regarding these rights, please reference the Sanofi Global Privacy Policy at www.sanofi.com/en/our-responsibility/sanofi-global-privacy-policy. I understand that if I decline to sign this authorization, I will not be able to participate in CareASSIST, but it otherwise will not affect my eligibility to obtain medical treatment, my ability to seek financial assistance from other sources, or my insurance enrollment or eligibility for insurance coverage. Furthermore, I understand that I may withdraw (take back) this authorization at any time by mailing or faxing a written request to CareASSIST, 450 Water St., 3rd Floor, Cambridge, MA 02141; Fax: 1-855-411-9689. Withdrawal of this authorization will end further uses and disclosures of My Information by the parties identified in this authorization except to the extent those uses and disclosures have been made in reliance upon this authorization prior to my request to withdraw this authorization. This authorization expires 18 months from the date support is last provided under any CareASSIST program, subject to applicable law, unless I withdraw it earlier. I understand that I may request a copy of this authorization.`,
                        checkBoxLabel:'I have read and agree to the patient authorization.'
                    },
                    patientParticipation:{
                        label:"Patient Participation",
                        content:`If your patient wishes to participate in the CareASSIST Program, there are sections of this application they must complete. Your patient must read, understand, and sign the Patient Consent and Certifications and the Patient Authorization to Disclose Information.<br/>
                        By providing your patient’s email address or cell phone number below and pressing “Send”, you certify that you have obtained the patient’s consent to receive email and/or text messages (as applicable) related to the CareASSIST Program, including notifying the patient that s/he has the right to opt out of future messages at any time, and, in the case of text messages, that his/her wireless service provider’s message / data rates may apply and his/her consent is not required as a condition of purchasing any goods or services from Sanofi US or their affiliates.`
                    },
                    missingPatient:{
                        label:"Missing Patient Email / Cell Phone",
                        content:"If you do not have an email address or cell phone number for your patient, you can submit your portion of this application now. CareASSIST will make a limited number of attempts to secure the information we need from your patient, including a signature on the Patient Consent and Certifications and the Patient Authorization to Disclose Information sections of this application. CareASSIST will contact your patient using the information you have provided within this application."
                    },
                    determineEligiblity:{
                        label:"Determine Eligiblity",
                        content:"CareASSIST cannot make an eligibility determination without securing all necessary information from your patient, including obtaining their signature on the Patient Consent and Certifications and the Patient Authorization to Disclose Information sections of this application."
                    },
                    doAgreeAuthorization: {
                        label: 'Do you agree to the Patient Authorization Statement?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' }
                        ]
                    },
                    sendMessageNow: {
                        label: 'Would you like to send the patient a message now?',
                        option: [
                            { valueString: 'Yes', displayedString: 'Yes' },
                            { valueString: 'No', displayedString: 'No' }
                        ]
                    },
                    patientOrLegalEmail:"Patient or Legal Representative Email",
                    patientOrLegalNumber: 'Patient or Legal Representative Cell Phone Number',
                    optIn: {
                        label: '',
                        options: [
                            {
                                valueString: 'Text',
                                displayedString:
                                    'Opt in for text updates<br/>(See the above Patient Authorization Statement for Terms & Conditions)'
                            },
                            {
                                valueString: 'Info',
                                displayedString: 'Opt in to receive information about XTANDI Patient Connect',
                                tooltip:
                                    'XTANDI Support Solutions offers XTANDI Patient Connect to patients who have been prescribed XTANDI® (enzalutamide). This support helps connect patients and caregivers to independent resources and third-party support services that may help them manage disease and daily life while on treatment.'
                            },
                            { valueString: 'Materials', displayedString: 'Opt in to receive patient educational materials' }
                        ]
                    },
                    signature: {
                        signerFullName: 'Type Patient Signature',
                        typeItPreviewText: '',
                        signItPreviewText: 'Signature Box',
                        signItInstruction:
                            'By signing, you accept the terms of agreement and acknowledge you have read and agreed to the Program Participation.',
                        clearText: 'Clear',
                        showSignTypeSelect: false
                    },
                    legalSignature: {
                        signerFullName: 'Type Legal Representative Signature',
                        typeItPreviewText: '',
                        signItPreviewText: 'Signature Box',
                        signItInstruction:
                            'By signing, you accept the terms of agreement and acknowledge you have read and agreed to the Program Participation.',
                        clearText: 'Clear',
                        showSignTypeSelect: false
                    },
                    witnessAuthorization: {
                        label: 'Witness',
                        options: [
                            {
                                valueString: 'Witness',
                                displayedString: 'I attest to in witness whereof, [Signer] signing the patient authorization and release.'
                            }
                        ]
                    },
                    witnessInitials: 'Witness Full Name',
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel',
                        or:'OR',
                        send:'Send'
                    },
                    proceedModal:{
                        title:'Before you go...',
                        content:'An eligibility determination cannot be made until CareASSIST can secure all necessary information from your patient. Would you like to go back to send your patient a message now?',
                        primaryButtonText:'Yes, go back',
                        defaultButtonText:'No, continue'
                    },
                    cancelModal: {
                        title: 'Hold On!',
                        content:
                            'By selecting “No” to the Patient Authorization Statement, you will not be able to have insurance coverage verified, have alternate sources of assistance researched, or access other support provided by or on behalf of XTANDI Support Solutions. Are you sure you want to move forward without Patient Authorization?',
                        yesLeave: 'Yes, Continue',
                        noContinue: 'No, Go Back'
                    },
                    patientReqFields:["whoIsAuthorizing","signature" , "authorizerName" , "witnessInitials" , ],
                    legalRepReqFields:["whoIsAuthorizing","legalSignature" , "legalFullName" , "witnessInitials" , "legalRepFullName" , "relationToPatient" , ],
                    placeholders:{
                        legalRepName:'Input first and last name in here',
                        patientRepSignature:'Input patient representative signature in here',
                        witnessName:'Input witness\'s first and last name in here',
                        patientOrLegalEmail:"Input email in here",
                        patientOrLegalNumber: 'Input cell phone number in here',
                    }
                },
                actions: {
                    submitBtn: 'Continue',
                    cancelBtn: 'Cancel'
                },
                facilityInformation: {
                    step: {
                        header: 'Facility Information',
                        description: 'Please complete the following facility information.',
                        back: 'Previous Step'
                    },
                    body: {
                        facilityType: {
                            label: 'Facility Type',
                            option: [
                                {
                                    displayedString: 'Prescriber Office/Clinic',
                                    valueString: 'Prescriber Office/Clinic'
                                },
                                {
                                    displayedString: 'Hospital Outpatient',
                                    valueString: 'Hospital Outpatient'
                                },
                                {
                                    displayedString: 'Hospital Inpatient',
                                    valueString: 'Hospital Inpatient'
                                }
                            ]
                        },
                        facilityName: 'Facility Name',
                        facilityNamePlaceHolder: 'Facility name here',
                        addressLine1: 'Address 1',
                        addressLine1Placeholder: 'Facility address here',
                        addressLine2: 'Address 2',
                        addressLine2Placeholder: 'Building/suite #',
                        city: 'City',
                        cityPlaceholder: 'City here',
                        state: 'State',
                        statePlaceholder: 'State here',
                        zipCode: 'ZIP Code',
                        zipCodePlaceholder: 'ZIP Code here',
                        primaryContactName: 'Primary Contact Name',
                        primaryContactNamePlaceholder: 'Facility contact name here',
                        role: 'Title/Role',
                        rolePlaceholder: 'Facility contact title/role here',
                        primaryPhoneNumber: 'Primary Phone Number',
                        primaryPhoneNumberPlaceholder: '___-___-____',
                        primaryFaxNumber: 'Primary Fax Number',
                        primaryFaxNumberPlaceholder: '___-___-____',
                        primaryEmail: 'Primary Email',
                        primaryEmailPlaceholder: 'Facility contact email here'
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                prescriptionInformation: {
                    step: {
                        header: 'Prescription Information',
                        description: 'Please provide the following information to continue your patient\'s PAP enrollment.',
                        drugLink: 'Prescribing Information',
                        back: 'Previous Step'
                    },
                    body: {
                        specialtyPharmacy: {
                            label: 'If obtaining through specialty pharmacy, check which specialty pharmacy commercial prescription was sent to:',
                            option: [
                                {
                                    displayedString: 'CVS Specialty',
                                    valueString: 'CVS Specialty'
                                },
                                {
                                    displayedString: 'Biologics',
                                    valueString: 'Biologics'
                                }
                            ]
                        },
                       productSelected: "Product Selected",
                       icd10Code: "ICD-10 Code",
                       icd10CodePlaceholder: "Input ICD10 code here",
                       dosage: "Dosage",
                       dosagePlaceholder: "Input dosage as mg here",
                       quantity: "Quantity",
                       quantityPlaceholder: "Input quantity here",
                       refills: "Refills",
                       refillsPlaceholder: "Input refills here",
                       uploadedDocsPrescription: {
                        uploadLabel: `Would you like to upload a copy of the prescription?`,
                        description: 'Please use the upload button bellow',
                        restrictions: 'Files must be 20MB or less and in JPG, PNG or PDF format.',
                        documentHeader: 'Upload',
                        documentTypeId: DocumentType.UploadedFilePrescription,
                        documentDescriptor: 'Uploaded File (Prescription)',
                        deleteButton: 'Delete',
                        previewButton: 'Preview',
                        uploadButtonText: 'Upload',
                        fileSize: '(Files must be 20MB or less and in JPG, PNG, or PDF format)',
                        required: null
                        },
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                incomeVerification: {
                    step: {
                        header: 'Income Verification',
                        description: 'Please provide the following information to continue the patient’s enrollment.',
                        back: 'Previous Step'
                    },
                    body: {
                        householdSize: 'Household Size',
                        householdSizePlaceholder: 'Input household size in here',
                        householdSizeDescription: 'Including the patient',
                        annualHouseholdIncome: 'Annual Household Income',
                        annualHouseholdIncomePlaceholder: 'Input annual income in here',
                        annualHouseholdIncomeDescription: '',
                    },
                    action: {
                        submitBtn: 'Continue',
                        cancelBtn: 'Cancel'
                    }
                },
                errorPage: {
                    title: 'OOPs!',
                    description: `You have reached this page in error.
                      Please check the URL you were provided and try again.
                      We look forward to working with you!`
                }
            }
        };
    }
}
