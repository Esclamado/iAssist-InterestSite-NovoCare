import { TestBed } from '@angular/core/testing';

import { FlexStartContainerService } from './flex-start-container.service';

describe('FlexStartContainerService', () => {
  let service: FlexStartContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlexStartContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
