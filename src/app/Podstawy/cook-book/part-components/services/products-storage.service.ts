import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Measure, Product } from '../../types';
import { LocalStorageService } from './local-storage-service';
import { find, first, map } from 'rxjs/operators';
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
  measureId = '';

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

  addProduct(addedProduct: { duplicateState: boolean, product: { product: string, measure: string, kcal: number, allergens: Array<string> } }) {
    const current = JSON.parse(this.localStorageService.getItem('products'));
    this.measures$.pipe(first()).subscribe(measure => {
      this.typedMeasureId = measure.find(
        ({ name }) =>
          name === addedProduct.product.measure
      )?.measureId;
    });
    if (!this.typedMeasureId) {
      this.measureService.addMeasure(addedProduct.product.measure);
      this.measures$.pipe(first()).subscribe(measure => {
        this.typedMeasureId = measure.find(
          ({ name }) =>
            name === addedProduct.product.measure
        )?.measureId;
      });
    }
    this.products$.pipe(
      map((product) => {
        this.typedProductId = product.find(
          ({ name }) =>
            name === addedProduct.product.product
        )?.productId;
      }));
    if (!this.typedProductId) {
      this.typedProductId = cuid();
    } else {
      if (addedProduct.duplicateState) {
        this.measures$.pipe(
          map((measure) => {
            this.measureId = measure.find(
              ({ name }) =>
                name === addedProduct.product.measure
            ).measureId;
          }));
        this.products$.next(current.map(({ measures, allergens, ...value }) => ({
          ...value,
          allergens: addedProduct.product.allergens,
          measures: value.productId === this.typedProductId ? [...measures.map(({ measureId, kcal }) => ({
              measureId,
              kcal: measureId === this.measureId ? addedProduct.product.kcal : kcal
            }
          ))] : measures
        })));
      } else {
        this.products$.next(current.map(({ measures, allergens, ...value }) => ({
          ...value,
          allergens: addedProduct.product.allergens,
          measures: value.productId === this.typedProductId ? [...measures, {
            measureId: this.typedMeasureId,
            kcal: addedProduct.product.kcal
          }] : measures
        })));
      }
      this.localStorageService.setItem('products', JSON.stringify(this.products$.value)); /*error*/
      // this.products$.pipe(first()).subscribe(value => console.log('Edytowano miary produktu', value));
      return;
    }
    this.products$.next([...current, {
      productId: this.typedProductId,
      name: addedProduct.product.product,
      measures: [{ measureId: this.typedMeasureId, kcal: addedProduct.product.kcal }],
      allergens: addedProduct.product.allergens
    }]);
    this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
    // this.products$.pipe(first()).subscribe(value => console.log('Dodano nowy produkt, zapisano', value));
  }

  deleteProdMeasure(bothId: { givenMeasureId: string, givenProductId: string }) {
    const oldProducts: Array<Product> = JSON.parse(this.localStorageService.getItem('products'));
    let newProducts: Array<Product> = [...oldProducts.map(({ measures, ...value }) => ({
      ...value,
      measures: value.productId === bothId.givenProductId
        ? measures.filter(({ measureId }) => measureId !== bothId.givenMeasureId)
        : measures
    }))];
      ({ productId }) =>
        productId === bothId.givenProductId
    ));
    console.table(newProducts);
    if (newProducts.find(
      ({ productId }) =>
        productId === bothId.givenProductId
    ).measures.length === 0) {
      newProducts = [...newProducts.filter(product => product.productId !== bothId.givenProductId)];
    }
    this.products$.next([...newProducts]);
    this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
  }
}
