import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Hashes } from '../types';
import { map } from 'rxjs/operators';
import { TagsStorageService } from '../part-components/services/tags-storage.service';
import { AllergensStorageService } from '../part-components/services/allergens-storage.service';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
  data$;
  data;
  constructor() {
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
