import { GetPreferredPharmacyModel } from './get-preferred-pharmacy-model';
import { GetPrescriberSpecialtyModel } from './get-prescriber-specialty-model';

export interface GetPrescriberModel {
    prescriberId: string;
    suffix: string;
    prescriberSpecialty: GetPrescriberSpecialtyModel;
    phone: string;
    phoneExt: string;
    npi: string;
    prescriberStatus: string;
    preferredPharmacies: GetPreferredPharmacyModel[];
    drugEnforcementAdminNumber: string;
    taxId: string;
    signatureData: any;
}
