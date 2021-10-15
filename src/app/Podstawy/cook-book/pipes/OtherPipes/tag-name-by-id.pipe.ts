import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Hash } from '../../types';
import { map } from 'rxjs/operators';
import { TagsStorageService } from '../../part-components/services/tags-storage.service';
import { AllergensStorageService } from '../../part-components/services/allergens-storage.service';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
  constructor(private tagsService: TagsStorageService, private  allergenService: AllergensStorageService) {
  }
  tags$: Observable<Array<Hash>> = this.tagsService.tags$;
  allergens$: Observable<Array<Hash>> = this.allergenService.allergens$;

  transform(id: string, type: string): Observable<string> {
    if (type === 'tags') {
      return this.tags$.pipe(
        map((tag) => {
          return tag.find(
            ({ hashId }) =>
              hashId === id
          )?.name;
        }));
    } else {
      return this.allergens$.pipe(
        map((tag) => {
          return tag.find(
            ({ hashId }) =>
              hashId === id
          )?.name;
        }));
    }
  }
}
