import { TestBed } from '@angular/core/testing';

import { DishIdGeneratorService } from './dish-id-generator.service';

describe('DihsIdGeneratorService', () => {
  let service: DishIdGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishIdGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
