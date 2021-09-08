import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hashes } from '../types';
import { filter, first } from 'rxjs/operators';
import { stringify } from 'querystring';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
  data = null;

  transform(value: string, tags$: any): string {
    console.log('Otrzymano: ', value);

    tags$.value.forEach(tag => {
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
