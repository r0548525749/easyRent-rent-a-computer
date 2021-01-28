import { TestBed } from '@angular/core/testing';

import { VersionesService } from './versiones.service';

describe('VersionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VersionesService = TestBed.get(VersionesService);
    expect(service).toBeTruthy();
  });
});
