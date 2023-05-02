import { TestBed } from '@angular/core/testing';

import { FormCreationService } from './form-creation.service';

describe('FormCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormCreationService = TestBed.inject(FormCreationService);
    expect(service).toBeTruthy();
  });
});
