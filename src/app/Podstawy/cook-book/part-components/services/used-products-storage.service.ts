import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddedUsedProductType, Dish, Measure, Product, UsedProduct } from '../../types';
import * as cuid from 'cuid';
import { first, map } from 'rxjs/operators';
import { TagsStorageService } from './tags-storage.service';
import { LocalStorageService } from './local-storage-service';
import { ProductsStorageService } from './products-storage.service';
import { MeasuresStorageService } from './measures-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsedProductsStorageService {
  usedProducts$ = new BehaviorSubject<Array<UsedProduct>>([]);
  products$: Observable<Array<Product>> = this.productsService.products$;
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  productId = '';
  measureId = '';

  constructor(
    private tagsService: TagsStorageService,
    private localStorageService: LocalStorageService,
    private productsService: ProductsStorageService,
    private measureService: MeasuresStorageService) {

    if (!!localStorage.usedProducts) {
      const current = JSON.parse(this.localStorageService.getItem('usedProducts'));
      this.usedProducts$.next([...current]);
    } else {
      this.usedProducts$.next([
        { usedProductId: 'used1', productId: '11', measuresId: 'cuuu', amount: 2 },
        { usedProductId: 'used2', productId: '11', measuresId: 'cuuu', amount: 5 }
      ]);
      this.localStorageService.setItem('usedProducts', JSON.stringify(this.usedProducts$.value));
    }
  }

  addProduct(addedProduct: AddedUsedProductType) {
    const current = JSON.parse(this.localStorageService.getItem('usedProducts'));
    this.products$.pipe(first()).subscribe((usedProduct) => {
      this.productId = usedProduct.find(
        ({ name }) =>
          name === addedProduct.product
      ).productId;
    });

    this.measures$.pipe(first()).subscribe((usedProduct) => {
      this.measureId = usedProduct.find(
        ({ name }) =>
          name === addedProduct.measure
      ).measureId;
    });

    const newProd: UsedProduct = {
      usedProductId: cuid(),
      productId: this.productId,
      amount: addedProduct.amount,
      measuresId: this.measureId
    };
    this.usedProducts$.next([...current, newProd]);
    this.localStorageService.setItem('usedProducts', JSON.stringify(this.usedProducts$.value));
    return newProd;
  }

  deleteAllOf(bothId) {
    // const current: Array<UsedProduct> = JSON.parse(this.localStorageService.getItem('usedProducts'));
    // const current: Array<any> = JSON.parse(this.localStorageService.getItem('usedProducts'));
    // current.filter(({usedProduct}) => usedProduct.find(({productId, measureId}) =>
    //   productId !== bothId.givenProductId && measureId !== bothId.givenMeasureId));
    // this.usedProducts$.next([...current]);
    //
    // this.usedProducts$.next([...current.filter(({usedProduct}) => usedProduct.find(({productId, measureId}) =>
    //   productId !== bothId.givenProductId && measureId !== bothId.givenMeasureId))]);
    //
    // this.localStorageService.setItem('usedProducts', JSON.stringify(this.usedProducts$.value));
  }
}
