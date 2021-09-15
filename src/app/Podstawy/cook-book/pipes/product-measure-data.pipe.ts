import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Measure, Product, UsedProduct } from '../types';
import { MeasuresStorageService } from '../part-components/services/measures-storage.service';
import { map } from 'rxjs/operators';
import { ProductsStorageService } from '../part-components/services/products-storage.service';
import { forEach } from 'lodash';

@Pipe({
  name: 'productMeasureData'
})
export class ProductMeasureDataPipe implements PipeTransform {
  products$: Observable<Array<Product>> = this.productsService.products$;

  constructor(private productsService: ProductsStorageService) {
  }

  transform(givenId: string, givenPrductId: string) {
    return this.products$.pipe(
      map((products) => {
        return products.find(
          ({ productId }) =>
            productId === givenPrductId
        ).measures.find(({ measureId }) => measureId === givenId).kcal;
      }));
  }
}
