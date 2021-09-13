import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Products } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsStorageService {
  products$ = new BehaviorSubject<Array<Products>>([]);

  constructor() {
    if (!!localStorage.products) {
    } else {
      this.products$.next([
        { productId: '11', product: 'Mleko', kcal: 10, measures: null, allergens: ['Laktoza'] },
        { productId: cuid(), product: 'Woda', kcal: 10, measures: null, allergens: null },
        { productId: cuid(), product: 'Drożdze', kcal: 10, measures: null, allergens: null },
        { productId: cuid(), product: 'Mąka', kcal: 10, measures: null, allergens: null },
        { productId: cuid(), product: 'Cukier', kcal: 10, measures: null, allergens: null },
        { productId: cuid(), product: 'Jaja', kcal: 10, measures: null, allergens: ['Laktoza', 'Białko'] }
      ]);
    }
  }
}
