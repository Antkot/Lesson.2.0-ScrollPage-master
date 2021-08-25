import { TestBed } from '@angular/core/testing';

import { AllergensStorageService } from './allergens-storage.service';

describe('AllergensStorageService', () => {
  let service: AllergensStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergensStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
