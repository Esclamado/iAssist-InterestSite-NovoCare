import { Injectable } from '@angular/core';
import {
    IWorkflowService,
    WorkflowDescriptionResponse,
    WorkflowInformationRequest
} from 'flex-start';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FlexStartWorkflowService implements IWorkflowService {
    getWorkflowInformation(
        workflowInfoRequest: WorkflowInformationRequest
    ): Observable<WorkflowDescriptionResponse> {
        return of(<any>null);
    }
}
