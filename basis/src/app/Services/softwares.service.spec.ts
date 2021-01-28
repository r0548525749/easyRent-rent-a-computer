import { TestBed } from '@angular/core/testing';

import { SoftwaresService } from './softwares.service';

describe('SoftwaresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoftwaresService = TestBed.get(SoftwaresService);
    expect(service).toBeTruthy();
  });
});
