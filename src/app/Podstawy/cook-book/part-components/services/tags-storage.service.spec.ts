import { TestBed } from '@angular/core/testing';

import { TagsStorageService } from './tags-storage.service';

describe('TagsStorageService', () => {
  let service: TagsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
