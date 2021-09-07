import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hashes } from '../types';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {

  transform(value: string, tags$: any): string {
    // const current = tags$.value;
    console.table('Otrzymany string: ', value);
    const translatedTag = tags$.name.find(x => x.hashId === value);
    console.table('translated tag: ', translatedTag);
    // return translatedTag;
    return 'xx';
  }

}
//
// const translatedTag = tags$.next([
//   ...current
//   // ...current.filter(record => record.hashId !== value)
// ]);
