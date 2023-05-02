import { TestBed } from '@angular/core/testing';

import { PrescriberInformationService } from './prescriber-information.service';

describe('PrescriberInformationService', () => {
  let service: PrescriberInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriberInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
