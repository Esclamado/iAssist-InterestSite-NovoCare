import { TestBed } from '@angular/core/testing';

import { ProviderAttestationService } from './provider-attestation.service';

describe('ProviderAttestationService', () => {
  let service: ProviderAttestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderAttestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
