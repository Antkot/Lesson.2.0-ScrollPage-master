import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, UsedProduct } from '../../types';
import { map } from 'rxjs/operators';
import { UsedProductsStorageService } from '../../part-components/services/used-products-storage.service';

@Pipe({
    name: 'usedProductConnector'
})
export class UsedProductConnectorPipe implements PipeTransform {
  usedProducts$: Observable<Array<UsedProduct>> = this.usedProductsService.usedProducts$;
constructor(private usedProductsService: UsedProductsStorageService) {
}
  transform( givenUsedProductId: string, search: string): any {
    return this.usedProducts$.pipe(
      map((usedProduct) => {
        return usedProduct.find(
          ({ usedProductId }) =>
            usedProductId === givenUsedProductId
        )[search];
      }));
  }

}
