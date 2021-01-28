import { TestBed } from '@angular/core/testing';

import { ShoppingBagService } from './shopping-bag.service';

describe('ShoppingBagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingBagService = TestBed.get(ShoppingBagService);
    expect(service).toBeTruthy();
  });
});
