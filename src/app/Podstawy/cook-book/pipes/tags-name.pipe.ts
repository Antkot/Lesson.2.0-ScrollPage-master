import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { TagsStorageService } from '../part-components/services/tags-storage.service';
import { Hashes } from '../types';

@Pipe({
  name: 'tagName'
})
export class TagsNamePipe implements PipeTransform {
  // tags$: Observable<Array<Hashes>> = this.service.tags$;

  constructor() {}

  transform(value: string) {
    return 'dddd';
  }
}
