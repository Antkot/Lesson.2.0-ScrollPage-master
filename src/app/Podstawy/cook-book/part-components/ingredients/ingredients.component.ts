import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { Dish, Hash, Measure, Product, UsedProduct } from '../../types';
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
  @Input() edit: boolean;
  @Input() products: Array<{ usedProductId: string }>;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  autoMeasure$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  model = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(1)]],
    measure: ['Wpisz produkt', [Validators.required, Validators.minLength(1)]],
    // amount: ['', [this.model.value.product.length === 0,  Validators.required, Validators.min(1)]]
    amount: ['', [Validators.required, Validators.min(1)]]
  });
  finalCombine$ = new BehaviorSubject<Array<Measure>>([]);
  typedMeasureId: string;
  productFromList: boolean;
  isMeasureDuplicated: boolean;
  modelClone: {
    product: string,
    measure?: string,
    amount: string,
  } = { product: '', amount: '' };
  x;

  constructor(
    private productsService: ProductsStorageService,
    private measureService: MeasuresStorageService,
    private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.model.controls[`measure`].disable();
    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        take(100),   // działa ? xD
        // zmiana musi być na this.model
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
              this.isMeasureDuplicated = !!products.find(({ name }) => name === value.product)?.measures
                .find(({ measureId }) => measureId === this.typedMeasureId);
              products.find(({ name }) => name === value.product)?.measures
                .find(({ measureId }) => measureId === this.typedMeasureId);


              this.productFromList = !!(products.find(({ name }) => name === value.product)?.name);
              this.typedMeasureId = measures.find(({ name }) => name === value?.measure)?.measureId;
              this.modelClone = { ...value };
              console.log('this.productFromList', this.productFromList);
              if (this.productFromList) {
                let onlyMeasureName = '';
                if (products.find(({ name }) => name === value.product)?.measures.length === 1) {
                  console.log('lenght: ', products.find(({ name }) => name === value.product)?.measures.length);
                  this.isMeasureDuplicated = true;

                  // this.measures$.pipe(
                  //   map((measure) => {
                  //     const t = measure.find(
                  //       ({ measureId }) =>
                  //         measureId === products.find(({ name }) => name === value.product)?.measures[0].measureId
                  //     );
                  //     console.log('t', t);
                  //   }));
                  // console.log('t2', products.find(({ name }) => name === value.product)?.measures[0].measureId);
                  //


                  this.measures$.pipe(
                    first()).subscribe((measure) => {
                      onlyMeasureName = measure.find(
                        ({ measureId }) =>
                          measureId === products.find(({ name }) => name === value.product).measures[0].measureId
                      ).name;
                    });
                  console.log('onlyMeasureName: ');
                  console.log(onlyMeasureName);
                }

                return this.modelReset(true, onlyMeasureName);
              } else if (!!value?.measure) {
                return this.modelReset(false, '');
              } else {
              }
            });
          });
        })
      )
    );

    this.model.valueChanges.subscribe(({ product, measure }) => {
      this.products$.pipe(first()).subscribe((products) => {
        let productsResult = null;
        if (product?.length > 0 && product) {
          const options = {
            keys: ['name']
          };
          const fuse = new Fuse(products, options);
          productsResult = fuse.search(product).map(({ item }) => item);
        } else {
          productsResult = products;
        }
        this.autoProducts$.next(productsResult.map(({ name, productId }) => ({ name, productId })));
      });
      this.finalCombine$.pipe(first()).subscribe((measures) => {
        let measuresResult = null;
        if (measure?.length > 0 && measure) {
          const options = {
            keys: ['name']
          };
          const fuse = new Fuse(measures, options);
          measuresResult = fuse.search(measure).map(({ item }) => item);
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

  modelReset(reset, onlyMeasureName) {
    if (reset) {
      this.model.controls[`measure`].reset();
      this.model.controls[`measure`].enable();
      this.model.controls[`measure`].setValue(onlyMeasureName);
    } else {
      this.model.controls[`measure`].setValue('Wpisz produkt');
      this.model.controls[`measure`].disable();
    }
  }


  disabled() {
    return false;
  }

  addProduct(newProduct) {
    this.addedProduct.emit(newProduct);
  }

  deleteProdMeasure(bothId: { givenMeasureId: string, givenProductId: string }) {
    this.prodMeasureDeleted.emit(bothId);
  }
}
