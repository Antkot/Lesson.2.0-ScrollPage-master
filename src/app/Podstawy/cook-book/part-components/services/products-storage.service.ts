import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Measure, Product } from '../../types';
import { LocalStorageService } from './local-storage-service';
import { first, map } from 'rxjs/operators';
import { MeasuresStorageService } from './measures-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsStorageService {
  products$ = new BehaviorSubject<Array<Product>>([]);
  measures$: Observable<Array<Measure>> = this.measureService.measures$;

  constructor(private localStorageService: LocalStorageService, private  measureService: MeasuresStorageService) {
    if (!!localStorage.products) {
      console.log('loaded products');
      const current = JSON.parse(this.localStorageService.getItem('products'));
      this.products$.next([...current]);
    } else {
      console.log('created products');
      this.products$.next([
        { productId: '11', name: 'Mleko', measures: [{ measureId: 'cuuu', kcal: 600 }], allergens: [{ allergenId: 'Laktoza' }] },
        { productId: cuid(), name: 'Woda', measures: null, allergens: null },
        { productId: cuid(), name: 'Drożdze', measures: null, allergens: null },
        { productId: cuid(), name: 'Mąka', measures: null, allergens: null },
        { productId: cuid(), name: 'Cukier', measures: null, allergens: null },
        { productId: cuid(), name: 'Jaja', measures: null, allergens: [{ allergenId: 'Laktoza' }, { allergenId: 'Białko' }] }
      ]);
      this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
    }
  }

  addProduct(event) {
    this.products$.pipe(first()).subscribe(value => console.log('Product1', value));
    const current = JSON.parse(this.localStorageService.getItem('products'));
    const addedMeasureId = this.measures$.pipe(
      map((measure) => {
        return measure.find(
          ({ name }) =>
            name === event.measure
        ).measureId;
      }));
    this.products$.next([...current, {
      productId: cuid(),
      name: event.product,
      measures: [{ measureId: addedMeasureId, kcal: event.kcal }],
      allergens: event.allergens
    }]);
    this.products$.pipe(first()).subscribe(value => console.log('products', value));

    this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
  }
}
