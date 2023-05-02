import { GetPhoneModel } from './get-phone.model';
import { GetPrescriberModel } from './get-prescriber.model';
import { GetRelationshipModel } from './get-relationship.model';

export interface GetUserModel {
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    title: string;
    dateOfBirth: Date;
    gender: string;
    isActive: boolean;
    phoneNumber: GetPhoneModel;
    prescriberDetails: GetPrescriberModel;
    relationships: GetRelationshipModel[];
    deletedOn: string;
}
