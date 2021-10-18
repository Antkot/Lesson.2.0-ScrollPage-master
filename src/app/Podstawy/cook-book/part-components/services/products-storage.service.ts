import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddedProductType, BothIdType, Measure, Product } from '../../types';
import { LocalStorageService } from './local-storage-service';
import { find, first, map } from 'rxjs/operators';
import { MeasuresStorageService } from './measures-storage.service';
import { async } from '@angular/core/testing';
import { number } from '@storybook/addon-knobs';
import { add } from 'lodash';

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

  addProduct(addedProduct: AddedProductType) {
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
    this.products$.pipe(first()).subscribe((product) => {
      this.typedProductId = product.find(
        ({ name }) =>
          name === addedProduct.product.product
      )?.productId;
    });
    if (!this.typedProductId) {
      this.typedProductId = cuid();
    } else {

      // tu
      console.log('Istniejący produkt zostanie nadpisany');
      if (addedProduct.duplicateState) {
        console.log('Istniejąca miara zostanie nadpisana');
        this.measures$.pipe(first()).subscribe((measure) => {
          this.measureId = measure.find(
            ({ name }) =>
              name === addedProduct.product.measure
          ).measureId;
        });
        this.products$.next(current.map(({ measures, allergens, ...value }) => ({
          ...value,
          allergens: value.productId === this.typedProductId ? addedProduct.product.allergens : allergens,
          measures: value.productId === this.typedProductId ? [...measures.map(({ measureId, kcal }) => ({
              measureId,
              kcal: measureId === this.measureId ? addedProduct.product.kcal : kcal
            }
          ))] : measures
        })));
      } else {
        console.log('Zostanie dodana nowa miara');
        this.products$.next(current.map(({ measures, allergens, ...value }) => ({
          ...value,
          allergens: value.productId === this.typedProductId ? addedProduct.product.allergens : allergens,
          measures: value.productId === this.typedProductId ? [...measures, {
            measureId: this.typedMeasureId,
            kcal: addedProduct.product.kcal
          }] : measures
        })));
      }
      console.log('Istniejący produkt - zakończono procedurę');
      this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
      // this.products$.pipe(first()).subscribe(value => console.log('Edytowano miary produktu', value));
      return;
    }
    //


    this.products$.next([...current, {
      productId: this.typedProductId,
      name: addedProduct.product.product,
      measures: [{ measureId: this.typedMeasureId, kcal: addedProduct.product.kcal }],
      allergens: addedProduct.product.allergens
    }]);
    this.localStorageService.setItem('products', JSON.stringify(this.products$.value));
    // this.products$.pipe(first()).subscribe(value => console.log('Dodano nowy produkt, zapisano', value));
  }

  deleteProdMeasure(bothId: BothIdType) {
    const oldProducts: Array<Product> = JSON.parse(this.localStorageService.getItem('products'));
    let newProducts: Array<Product> = [...oldProducts.map(({ measures, ...value }) => ({
      ...value,
      measures: value.productId === bothId.givenProductId
        ? measures.filter(({ measureId }) => measureId !== bothId.givenMeasureId)
        : measures
    }))];

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
