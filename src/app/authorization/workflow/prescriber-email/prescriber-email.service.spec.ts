import { TestBed } from '@angular/core/testing';

import { PrescriberEmailService } from './prescriber-email.service';

describe('PrescriberEmailService', () => {
  let service: PrescriberEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriberEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
