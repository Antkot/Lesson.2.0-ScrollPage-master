import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hashes } from '../types';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {
constructor(private  tagsService: TagNameByIdPipe) {
}
  tags$: Observable<Array<Hashes>> = this.tagsService.tags$;

  transform(value: string): void {
    const current = this.tags$.value;
    console.table(1, value);
    console.table(2, this.tags$);
    const translatedTag = this.tags$.next([
      ...current.filter(record => record.hashId === value)
    ]);
    console.table('Table:', translatedTag);
    return translatedTag;
  }

}
