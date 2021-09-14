import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hashes } from '../types';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { stringify } from 'querystring';
import { TagsStorageService } from '../part-components/services/tags-storage.service';
import { Store } from '@ngrx/store';
import { async } from '@angular/core/testing';
import { AllergensStorageService } from '../part-components/services/allergens-storage.service';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
  data$;
  data;
  constructor(private tagsService: TagsStorageService, private allergensService: AllergensStorageService) {
  }
  transform(value: string, tags$: Observable<Array<Hashes>>): any {
    this.data$ = tags$.pipe(
      map((tag) => ({
        tagName: tag.find(
          ({ hashId, name }) =>
            hashId === value
        )?.name
      })));
    this.data$.subscribe(data => this.data = data);
    return this.data.tagName;

  }
}
