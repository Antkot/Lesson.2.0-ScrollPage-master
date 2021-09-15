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
  constructor() {
  }
  transform(value: string, tags$: Observable<Array<any>>): any {
     return tags$.pipe(
      map((tag) => {
        return tag.find(
          ({ hashId }) =>
            hashId === value
        )?.name;
      }));

  }
}
