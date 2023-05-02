import { TestBed } from '@angular/core/testing';

import { PrescriberNewNpiService } from './prescriber-new-npi.service';

describe('PrescriberNewNpiService', () => {
  let service: PrescriberNewNpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriberNewNpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
