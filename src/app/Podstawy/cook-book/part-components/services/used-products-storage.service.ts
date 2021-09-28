import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, Measure, Product, UsedProduct } from '../../types';
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

  addProduct(addedProduct) {
    // this.usedProducts$.pipe(first()).subscribe(value => console.log('Lista przed', value));
    const current = JSON.parse(this.localStorageService.getItem('usedProducts'));
    const givenProduct$ = this.products$.pipe(
      map((usedProduct) => {
        return usedProduct.find(
          ({ name }) =>
            name === addedProduct.product
        ).productId;
      }));

    givenProduct$.pipe(first()).subscribe(value =>
      this.productId = value);

    const givenMeasure$ = this.measures$.pipe(
      map((usedProduct) => {
        return usedProduct.find(
          ({ name }) =>
            name === addedProduct.measure
        ).measureId;
      }));

    givenMeasure$.pipe(first()).subscribe(value =>
      this.measureId = value);

    const newProd: UsedProduct = {
      usedProductId: cuid(),
      productId: this.productId,
      amount: addedProduct.amount,
      measuresId: this.measureId
    };
    this.usedProducts$.next([...current, newProd]);
    // this.usedProducts$.pipe(first()).subscribe(value => console.log('Lista po', value));
    this.localStorageService.setItem('usedProducts', JSON.stringify(this.usedProducts$.value));
    return newProd;
  }
}
