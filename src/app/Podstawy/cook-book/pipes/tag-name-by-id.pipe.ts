import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hashes } from '../types';
import { filter } from 'rxjs/operators';
import { stringify } from 'querystring';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
  getMovies = null;

  transform(value: string, tags$: Observable<Hashes>): any {
    // const current = tags$.value;
    // const translatedTag = tags$.find(x => x.hashId === value);
    // console.table('translated tag: ', translatedTag);
    // return translatedTag;
    const example = (tags$.pipe(filter(tag => tag.hashId === value)));
    return example;
    // return this.getMovies.map(movies => movies.find(movie => movie.id === value));
  }

  // return 'xx';
  // }

}

//
// const translatedTag = tags$.next([
//   ...current
//   // ...current.filter(record => record.hashId !== value)
// ]);
