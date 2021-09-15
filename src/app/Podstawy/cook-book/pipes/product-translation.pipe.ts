import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Hashes, Products } from '../types';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'productTranslation'
})
export class ProductTranslationPipe implements PipeTransform {
  constructor() {
  }
  transform(value: string, tags$: Observable<Array<Products>>, search: string): any {
    return tags$.pipe(
      map((tag) => {
        return tag.find(
          ({ productId }) =>
            productId === value
        )[search];
      }));
  }
}
