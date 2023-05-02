import { TestBed } from '@angular/core/testing';

import { PharmacyService } from './pharmacy.service';

describe('PharmacyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmacyService = TestBed.inject(PharmacyService);
    expect(service).toBeTruthy();
  });
});
