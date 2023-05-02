import { GetPermissionModel } from 'flex-start/lib/prescribers/models/server/get-permission-model';
import { GetUserModel } from './get-user.model';

export interface GetRelationshipModel {
    relationshipId: number;
    prescriberUserOrganizationId: number;
    userOrganizationId: number;
    permissionId: number;
    permission: GetPermissionModel;
    prescriber: GetUserModel;
    officeStaff: GetUserModel;
}
