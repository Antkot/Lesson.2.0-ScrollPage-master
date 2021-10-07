import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Measure, Product } from '../../types';
import { LocalStorageService } from './local-storage-service';
import { first, map } from 'rxjs/operators';
import { MeasuresStorageService } from './measures-storage.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ProductsStorageService {
  products$ = new BehaviorSubject<Array<Product>>([]);
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  typedMeasureId = '';
  typedProductId = '';

  constructor(private localStorageService: LocalStorageService, private measureService: MeasuresStorageService) {
    if (!!localStorage.products) {
      const current = JSON.parse(this.localStorageService.getItem('products'));
      this.products$.next([...current]);
    } else {
      this.products$.next([
        { productId: '11', name: 'Woda', measures: [{ measureId: 'cuuu', kcal: 0 }], allergens: [] }
      ]);
      this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
    }
  }

  addProduct(addedProduct) {
    console.log(addedProduct.measure); // TU JEST DOBRA MIARA
    console.log(1, addedProduct.kcal);
    // this.products$.pipe(first()).subscribe(value => console.log('Product-1', value));
    const current = JSON.parse(this.localStorageService.getItem('products'));
    let typedMeasureId$ = this.measures$.pipe(
      map((measure) => {
        return measure.find(
          ({ name }) =>
            name === addedProduct.measure
        )?.measureId;
      }));
    typedMeasureId$.pipe(first()).subscribe(value =>
      console.log('Sprawdzanie ID miary: ', this.typedMeasureId = value)
    );
    if (!this.typedMeasureId) {
      this.measureService.addMeasure(addedProduct.measure);
      typedMeasureId$ = this.measures$.pipe(
        map((measure) => {
          return measure.find(
            ({ name }) =>
              name === addedProduct.measure
          )?.measureId;
        }));
      typedMeasureId$.pipe(first()).subscribe(value =>
        this.typedMeasureId = value
      );
      // console.log('Stworzono nowe ID miary: ', this.typedMeasureId );
    }
    const typedProductId$ = this.products$.pipe(
      map((product) => {
        return product.find(
          ({ name }) =>
            name === addedProduct.product
        )?.productId;
      }));
    typedProductId$.pipe(first()).subscribe(value =>
      this.typedProductId = value
    );
    // console.log('Sprawdzanie ID produktu: ', this.typedProductId);
    if (!this.typedProductId) {
      this.typedProductId = cuid();
      // console.log('Stworzono nowe ID produktu: ', this.typedProductId);
    } else {
      console.log('3!'); // to się dzieje
      this.products$.next(current.map(({ measures, ...value }) => ({
        ...value,
        measures: value.productId === this.typedProductId ? [...measures, {
          measureId: this.typedMeasureId,
          kcal: addedProduct.kcal
        }] : measures
      })));
      this.localStorageService.setItem('products', JSON.stringify(this.products$.value)); /*error*/
      console.log('Dany produkt istnieje');
      this.products$.pipe(first()).subscribe(value => console.log('Edytowano miary produktu', value));
      return;
    }
    console.log('4!'); // to się nei dzieje
    // tworzy nowe productID
    console.log(2, addedProduct.kcal); // nie dzieje sie
    this.products$.next([...current, {
      productId: this.typedProductId,
      name: addedProduct.product,
      measures: [{ measureId: this.typedMeasureId, kcal: addedProduct.kcal }],
      allergens: addedProduct.allergens
    }]);
    this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
    this.products$.pipe(first()).subscribe(value => console.log('Dodano nowy produkt, zapisano', value));
  }

  deleteProdMeasure([givenMeasureId, productId]) {
    console.log('usuwana miara ', givenMeasureId, ' z produktu ', productId);
    const current = JSON.parse(this.localStorageService.getItem('products'));

    // this.products$.next(
    //   [
    //     ...current.filter(product => product.productId !== productId)
    //   ]
    // );

    this.products$.next(current.map(({ measures, ...value }) => ({
      ...value,
      measures: value.productId === productId ? [...measures.filter( measureId => measureId !== givenMeasureId)] : measures
    })));
    this.localStorageService.setItem('products', JSON.stringify(this.products$.value));

  }

}

// można dodać i wybrać pustą miarę, produkt, kcal
