import { TestBed } from '@angular/core/testing';

import { ComputerWithProgramService } from './computer-with-program.service';

describe('ComputerWithProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComputerWithProgramService = TestBed.get(ComputerWithProgramService);
    expect(service).toBeTruthy();
  });
});
