import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Hashes, Products } from '../types';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'productTranslation'
})
export class ProductTranslationPipe implements PipeTransform {
  data$;
  data;
  constructor() {
  }
  transform(value: string, tags$: Observable<Array<Products>>): any {
    this.data$ = tags$.pipe(
      map((tag) => ({
        productName: tag.find(
          ({ productId, product, kcal }) =>
            productId === value
        )
      })));
    this.data$.subscribe(data => this.data = data);
    const str = `${this.data.productName.measures} - ${this.data.productName.product} ( ${this.data.productName.allergens}) , kcal: ${this.data.productName.kcal}`;
    return str;

  }

}
