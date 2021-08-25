import { TestBed } from '@angular/core/testing';

import { ProductsStorageService } from './products-storage.service';

describe('ProductsStorageService', () => {
  let service: ProductsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
