export interface ProviderAttestationFormData {
    agreeToConsent?: {
        a?: boolean;
    };
    prescriberCertificationFullName?: string;
    prescriberCertificationSignature?: string;
    prescriberCertification?: string;
}