import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, UsedProduct } from '../../types';
import { UsedProductsStorageService } from '../../part-components/services/used-products-storage.service';
import { map } from 'rxjs/operators';
import { ProductsStorageService } from '../../part-components/services/products-storage.service';

@Pipe({
  name: 'productConnect'
})
export class ProductConnectorPipe implements PipeTransform {
  products$: Observable<Array<Product>> = this.productsService.products$;

  constructor(private productsService: ProductsStorageService) {
  }

  transform(givenProductId: string): any {
    return this.products$.pipe(
      map((usedProduct) => {
        return usedProduct.find(
          ({ productId }) =>
            productId === givenProductId
        );
      }));
  }
}
