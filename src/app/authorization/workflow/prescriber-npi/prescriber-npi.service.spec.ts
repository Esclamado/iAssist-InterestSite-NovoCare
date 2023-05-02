import { TestBed } from '@angular/core/testing';

import { PrescriberNpiService } from './prescriber-npi.service';

describe('PrescriberNpiService', () => {
  let service: PrescriberNpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriberNpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
