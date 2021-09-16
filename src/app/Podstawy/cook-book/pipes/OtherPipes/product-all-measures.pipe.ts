import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../types';
import { ProductsStorageService } from '../../part-components/services/products-storage.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'productAllMeasures'
})
export class ProductAllMeasuresPipe implements PipeTransform {

  constructor(private productsService: ProductsStorageService) {
  }

  transform(givenMeasureArray: Array<{ measureId: string, kcal: number }>): any {
    return givenMeasureArray.pipe(
      map((value) => {
        return value.measureId;
      }));
  }
}
