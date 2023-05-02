import { TestBed } from '@angular/core/testing';

import { ViewInsuranceModalService } from './view-insurance-modal.service';

describe('ViewInsuranceModalService', () => {
  let service: ViewInsuranceModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewInsuranceModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
