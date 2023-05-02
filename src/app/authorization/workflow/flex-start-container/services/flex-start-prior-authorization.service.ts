import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  DataService,
  FactIds,
  GetEpaQuestionsRequest,
  GetEpaQuestionsResponse,
  GetPaDrugsRequest,
  GetPaDrugsResponse,
  GetPaFormsRequest,
  GetPaFormsResponse,
  GetPracticeLocationResponse,
  PaFormQuestionModel,
  PaFormQuestionsGenerateRequest,
  PriorAuthorizationService as FlexStartPriorAuthorizationService
} from 'flex-start';
import { Observable } from 'rxjs';
import { ApplicationConfig } from 'src/app/api/shared/models/application-config.model';
import { SubmitEpaRequestModel } from 'src/app/api/shared/models/flex-start-container/submit-epa-request.model';
import { WorkflowService } from '../../workflow.service';

@Injectable({
  providedIn: 'root'
})
export class PriorAuthorizationService implements FlexStartPriorAuthorizationService {
  private readonly _baseUrl: string;

  constructor(
    @Inject('ApplicationConfig') applicationConfig: ApplicationConfig,
    private _dataService: DataService,
    private _http: HttpClient,
    private workflowService: WorkflowService
  ) {
    this._baseUrl = `${applicationConfig.organizationalBaseAddress}`;
  }

  getPAForms(request: GetPaFormsRequest): Observable<GetPaFormsResponse> {
    const url = `${this._baseUrl}epa/formCriteria`;

    const params = new HttpParams()
      .set('pageIndex', request.pageIndex.toString())
      .set('pageSize', request.pageSize.toString())
      .set('search', request.search)
      .set('drugId', request.drugId.toString());

    return this._http.get<GetPaFormsResponse>(url, { params });
  }

  getEpaQuestions(request: GetEpaQuestionsRequest): Observable<GetEpaQuestionsResponse> {
    const url = `${this._baseUrl}integrations/paqsfinder`;
    return this._http.post<GetEpaQuestionsResponse>(url, request);
  }

  getDrugs(request: GetPaDrugsRequest): Observable<GetPaDrugsResponse> {
    const url = `${this._baseUrl}epa/drug`;

    const params = new HttpParams()
      .set('pageIndex', request.pageIndex.toString())
      .set('pageSize', request.pageSize.toString())
      .set('search', request.search || '');

    return this._http.get<GetPaDrugsResponse>(url, { params });
  }

  getFormQuestions(formId: number): Observable<PaFormQuestionModel[]> {
    const url = `${this._baseUrl}epa/form/${formId}/questions`;
    return this._http.get<PaFormQuestionModel[]>(url);
  }

  submitEpaQuestions(questionSetId: string, answers: string): Observable<string> {
    const url = `${this._baseUrl}epa/submitEpaQuestions`;
    const dataSlice = this._dataService.read(FactIds.META_TRANSACTION_GROUP_ID);

    const request: SubmitEpaRequestModel = {
      transactionGroupId: dataSlice[FactIds.META_TRANSACTION_GROUP_ID],
      questionSetId: questionSetId,
      answers: answers
    };
    return this._http.post<string>(url, request);
  }

  submitPaQuestions(formId: number, request: PaFormQuestionsGenerateRequest): Observable<string> {
    const dataSlice = this._dataService.read(FactIds.META_TRANSACTION_GROUP_ID);
    const url = `${this._baseUrl}epa/form/${formId}/generate?transactionGroupId=${dataSlice[FactIds.META_TRANSACTION_GROUP_ID]}`;

    return this._http.post<string>(url, request);
  }

  getPracticeLocation(): Observable<GetPracticeLocationResponse> {
    const url = `${this._baseUrl}locations/primary`;
    return this._http.get<GetPracticeLocationResponse>(url);
  }
}
