import { TestBed } from '@angular/core/testing';

import { UsedProductsStorageService } from './used-products-storage.service';

describe('UsedProductsStorageService', () => {
  let service: UsedProductsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsedProductsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
