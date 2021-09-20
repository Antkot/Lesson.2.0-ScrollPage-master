import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../types';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsStorageService {
  products$ = new BehaviorSubject<Array<Product>>([]);

  constructor(private localStorageService: LocalStorageService) {
    if (!!localStorage.products) {
      const current = JSON.parse(this.localStorageService.getItem('products'));
      this.products$.next([...current]);
    } else {
      this.products$.next([
        { productId: '11', name: 'Mleko', measures: [{ measureId: 'cuuu', kcal: 600 }], allergens: [{ allergenId: 'Laktoza' }] },
        { productId: cuid(), name: 'Woda', measures: null, allergens: null },
        { productId: cuid(), name: 'Drożdze', measures: null, allergens: null },
        { productId: cuid(), name: 'Mąka', measures: null, allergens: null },
        { productId: cuid(), name: 'Cukier', measures: null, allergens: null },
        { productId: cuid(), name: 'Jaja', measures: null, allergens: [{allergenId: 'Laktoza'}, {allergenId: 'Białko'}] }
      ]);
      this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
    }
  }
}
