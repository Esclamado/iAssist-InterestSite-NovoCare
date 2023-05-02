import { TestBed } from '@angular/core/testing';

import { InsuranceInformationService } from './insurance-information.service';

describe('InsuranceInformationService', () => {
  let service: InsuranceInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
