import { TestBed } from '@angular/core/testing';

import { ComplaintsService } from './complaints.service';

describe('ComplaintsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplaintsService = TestBed.get(ComplaintsService);
    expect(service).toBeTruthy();
  });
});
