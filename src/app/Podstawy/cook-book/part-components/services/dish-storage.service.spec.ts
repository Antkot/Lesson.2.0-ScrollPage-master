import { TestBed } from '@angular/core/testing';

import { DishStorageService } from './dish-storage.service';

describe('DishStorageService', () => {
  let service: DishStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
