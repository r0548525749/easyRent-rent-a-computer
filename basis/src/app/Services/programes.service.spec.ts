import { TestBed } from '@angular/core/testing';

import { ProgramesService } from './programes.service';

describe('ProgramesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramesService = TestBed.get(ProgramesService);
    expect(service).toBeTruthy();
  });
});
