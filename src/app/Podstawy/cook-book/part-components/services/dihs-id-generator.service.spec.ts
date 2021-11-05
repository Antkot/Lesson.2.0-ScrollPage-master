import { TestBed } from '@angular/core/testing';

import { DihsIdGeneratorService } from './dihs-id-generator.service';

describe('DihsIdGeneratorService', () => {
  let service: DihsIdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DihsIdGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
