import { TestBed } from '@angular/core/testing';

import { MeasuresStorageService } from './measures-storage.service';

describe('MeasuresStorageService', () => {
  let service: MeasuresStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasuresStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
