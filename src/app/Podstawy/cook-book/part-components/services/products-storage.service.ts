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
        { productId: cuid(), product: 'Mleko', allergens: ['Laktoza'] },
        { productId: cuid(), product: 'Woda', allergens: null },
        { productId: cuid(), product: 'Drożdze', allergens: null },
        { productId: cuid(), product: 'Mąka', allergens: null },
        { productId: cuid(), product: 'Cukier', allergens: null },
        { productId: cuid(), product: 'Jaja', allergens: ['Laktoza', 'Białko'] }
      ]);
    }
  }
}
