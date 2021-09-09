import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hashes } from '../types';
import { filter, first } from 'rxjs/operators';
import { stringify } from 'querystring';
import { TagsStorageService } from '../part-components/services/tags-storage.service';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
  data = null;
  // tags$: Observable<Array<Hashes>> = this.tagsService.tags$;
  //
  // constructor(private tagsService: TagsStorageService) {
  // }
  transform(value: string, tags$: Array<Hashes>): string {
    console.log('Otrzymano: ', value);

    tags$.forEach(tag => {
      console.log(tag.hashId === value, tag.hashId, '===', value);
      if (tag.hashId === value) {
        this.data = tag.name;
        console.log(3, this.data);
        return this.data;
      }
    });
    console.log('Zwrot: ', this.data);
    return this.data;
  }

}

//
// const translatedTag = tags$.next([
//   ...current
//   // ...current.filter(record => record.hashId !== value)
// ]);
