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
        { nameId: cuid(), product: 'Mleko', allergens: ['Laktoza'] },
        { nameId: cuid(), product: 'Woda', allergens: null },
        { nameId: cuid(), product: 'Drożdze', allergens: null },
        { nameId: cuid(), product: 'Mąka', allergens: null },
        { nameId: cuid(), product: 'Cukier', allergens: null },
        { nameId: cuid(), product: 'Jaja', allergens: ['Laktoza', 'Białko'] }
      ]);
    }
  }
}
