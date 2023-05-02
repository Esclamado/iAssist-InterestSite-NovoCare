import { TestBed } from '@angular/core/testing';

import { TranslateContentService } from './translate-content.service';

describe('TranslateContentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslateContentService = TestBed.inject(TranslateContentService);
    expect(service).toBeTruthy();
  });
});
