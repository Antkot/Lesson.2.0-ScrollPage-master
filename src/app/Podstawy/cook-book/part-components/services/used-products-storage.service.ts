import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Measure, UsedProduct } from '../../types';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class UsedProductsStorageService {
  usedProducts$ = new BehaviorSubject<Array<UsedProduct>>([]);

  constructor() {

    if (!!localStorage.measures) {
    } else {
      this.usedProducts$.next([
        { usedProductId: 'used1', productId: '11',  measuresId: 'cuuu', amount: 2},
        { usedProductId: 'used2', productId: '11',  measuresId: 'cuuu', amount: 5},
      ]);
    }


  }
}
