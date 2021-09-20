import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish, Measure, UsedProduct } from '../../types';
import * as cuid from 'cuid';
import { first } from 'rxjs/operators';
import { TagsStorageService } from './tags-storage.service';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class UsedProductsStorageService {
  usedProducts$ = new BehaviorSubject<Array<UsedProduct>>([]);

  constructor(private tagsService: TagsStorageService, private localStorageService: LocalStorageService) {

    if (!!localStorage.measures) {
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

  addProduct(addedProduct: UsedProduct) {
    this.usedProducts$.pipe(first()).subscribe(value => console.log('UsedProduct1', value));
    const current = JSON.parse(this.localStorageService.getItem('usedProducts'));

    this.usedProducts$.next([...current, addedProduct]);
    this.usedProducts$.pipe(first()).subscribe(value => console.log('UsedProduct2', value));

    this.localStorageService.setItem('usedProducts', JSON.stringify(this.usedProducts$.value));
  }
}
