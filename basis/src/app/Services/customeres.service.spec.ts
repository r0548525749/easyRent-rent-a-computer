import { TestBed } from '@angular/core/testing';

import { CustomeresService } from './customeres.service';

describe('CustomeresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomeresService = TestBed.get(CustomeresService);
    expect(service).toBeTruthy();
  });
});
