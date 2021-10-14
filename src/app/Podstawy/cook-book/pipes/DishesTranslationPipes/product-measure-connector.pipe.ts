import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../types';
import { ProductsStorageService } from '../../part-components/services/products-storage.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'productMeasureConnector'
})
export class ProductMeasureConnectorPipe implements PipeTransform {
  products$: Observable<Array<Product>> = this.usedProductsService.products$;

  constructor(private usedProductsService: ProductsStorageService) {
  }

  transform(givenMeasureId: string, givenProductId: string) {
    return this.products$.pipe(
      map((usedProduct) => {
         return usedProduct.find(
          ({ productId }) =>
            productId === givenProductId
        ).measures.find(
          ({measureId}) =>
            measureId === givenMeasureId
        ).kcal;
      }));
  }
}
