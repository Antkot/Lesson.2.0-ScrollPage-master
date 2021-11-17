import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { AddedProductType, BothIdType, Dish, Hash, Measure, Product, UsedProduct } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MeasuresStorageService } from '../services/measures-storage.service';
import * as cuid from 'cuid';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, first, map, take, takeUntil, tap } from 'rxjs/operators';
import Fuse from 'fuse.js';
import { cloneDeep, forEach, result } from 'lodash';
import { number } from '@storybook/addon-knobs';
import { AliveState } from '../../../../ActiveState';
import { stringify } from 'querystring';
import { LoadingService } from '../services/loading.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent
  extends AliveState
  implements OnInit {
  @Output() addUsedProduct = new EventEmitter();
  @Output() addedProduct = new EventEmitter();
  @Output() prodMeasureDeleted = new EventEmitter();
  products$: Observable<Array<Product>> = this.productsService.products$;
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  edition$ = this.loadingService.edition$;
  // @Input() edit: boolean;
  @Input() products: Array<{ usedProductId: string }>;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  autoMeasure$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  model = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(1)]],
    measure: ['Wpisz produkt', [Validators.required, Validators.minLength(1)]],
    // amount: ['', [this.model.value.product.length === 0,  Validators.required, Validators.min(1)]]
    amount: ['', [Validators.required, Validators.min(0.01)]]
  });
  finalCombine$ = new BehaviorSubject<Array<Measure>>([]);
  isMeasureDuplicated: boolean;
  modelClone: {
    product: string,
    measure?: string,
    amount: string,
  } = { product: '', amount: '' };

  constructor(
    private productsService: ProductsStorageService,
    private measureService: MeasuresStorageService,
    private fb: FormBuilder,
    private loadingService: LoadingService) {
    super();
  }
// złe
  ngOnInit() {
    this.model.controls[`measure`].disable();
    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        filter((value) => this.modelClone.product !== value.product || (value?.measure && this.modelClone?.measure !== value.measure)),
        tap((value: {
          product: string,
          measure?: string,
          amount: string,
        }) => {
          this.products$.pipe(first()).subscribe((products) => {
            this.measures$.pipe(first()).subscribe((measures) => {
              this.finalCombine$.next(products.find(({ name }) => name === value.product)
                ? products.find(({ name }) => name === value.product)?.measures.map(({ measureId }) => ({
                  measureId,
                  name: measures.find((m) => m.measureId === measureId).name,
                  shortcut: measures.find((m) => m.measureId === measureId).shortcut
                })) : []);
              const productFromList = !!(products.find(({ name }) => name === value.product)?.name);
              const typedMeasureId = measures.find(({ name }) => name === value?.measure)?.measureId;
              this.isMeasureDuplicated = !!products.find(({ name }) => name === value.product)?.measures
                .find(({ measureId }) => measureId === typedMeasureId);
              this.modelClone = { ...value };
              console.log('this.productFromList', productFromList);
              if (productFromList) {
                let onlyMeasureName = '';
                if (products.find(({ name }) => name === value.product)?.measures.length === 1) {
                  console.log('lenght: ', products.find(({ name }) => name === value.product)?.measures.length);
                  this.isMeasureDuplicated = true;
                  this.measures$.pipe(
                    first()).subscribe((measure) => {
                    onlyMeasureName = measure.find(
                      ({ measureId }) =>
                        measureId === products.find(({ name }) => name === value.product).measures[0].measureId
                    ).name;
                  });
                }
                return this.modelReset(true, onlyMeasureName);
              } else if (!!value?.measure) {
                return this.modelReset(false, '');
              }
            });
          });
        })
      )
    );

    this.model.valueChanges.subscribe((value: { product: string, measure: string }) => {
      this.products$.pipe(first()).subscribe((products) => {
        let productsResult = null;
        if (value.product?.length > 0 && value.product) {
          const options = {
            keys: ['name']
          };
          const fuse = new Fuse(products, options);
          productsResult = fuse.search(value.product).map(({ item }) => item);
        } else {
          productsResult = products;
        }
        this.autoProducts$.next(productsResult.map(({ name, productId }) => ({ name, productId })));
      });
      this.finalCombine$.pipe(first()).subscribe((measures) => {
        let measuresResult = null;
        if (value.measure?.length > 0 && value.measure) {
          const options = {
            keys: ['name']
          };
          const fuse = new Fuse(measures, options);
          measuresResult = fuse.search(value.measure).map(({ item }) => item);
        } else {
          measuresResult = measures;
        }
        this.autoMeasure$.next(measuresResult.map(({ name, measureId }) => ({ name, measureId })));
      });
    });
  }

  newUsedProduct() {
    this.addUsedProduct.emit(this.model.value);
    this.model.reset();
  }

  modelReset(reset: boolean, onlyMeasureName: string) {
    if (reset) {
      this.model.controls[`measure`].enable();
      if (onlyMeasureName === '' && this.model.value.measure === 'Wpisz produkt') {
        this.model.controls[`measure`].reset();
      } else if (onlyMeasureName !== '') {
        this.model.controls[`measure`].reset();
        this.model.controls[`measure`].setValue(onlyMeasureName);
      }
    } else {
      this.model.controls[`measure`].setValue('Wpisz produkt');
      this.model.controls[`measure`].disable();
    }
  }


  disabled() {
    return false;
  }

  addProduct(newProduct: AddedProductType) {
    this.addedProduct.emit(newProduct);
  }

  deleteProdMeasure(bothId: BothIdType) {
    this.prodMeasureDeleted.emit(bothId);
  }
}
