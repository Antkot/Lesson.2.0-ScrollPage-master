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
  chosenProd$ = new BehaviorSubject<boolean>(false);
  finalCombine$ = new BehaviorSubject<Array<Measure>>([]);
  typedMeasureId;
  productFromList: boolean;
  isMeasureDuplicated: boolean;
  modelClone: {
    product: string,
    measure?: string,
    amount: string,
  } = { product: '', amount: '' };
  ignoreChange = false;

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
        take(15),
        filter((value) => this.modelClone.product !== value.product || (value?.measure && this.modelClone?.measure !== value.measure)),
        tap((value) => {
          this.products$.pipe(first()).subscribe((products) => {
            this.measures$.pipe(first()).subscribe((measures) => {
              this.finalCombine$.next(products.find(({ name }) => name === value.product)
                ? products.find(({ name }) => name === value.product)?.measures.map(({ measureId }) => ({
                  measureId,
                  name: measures.find((m) => m.measureId === measureId).name,
                  shortcut: measures.find((m) => m.measureId === measureId).shortcut
                })) : []);
              if (!this.ignoreChange) {
                console.log(this.ignoreChange);
                this.ignoreChange = false;
                this.productFromList = !!(products.find(({ name }) => name === value.product)?.name);
                this.typedMeasureId = measures.find(({ name }) => name === value?.measure)?.measureId;
                console.log('Oryginał');
                if (this.productFromList) {
                  console.log(22222222);
                  this.ignoreChange = true;
                  this.model.controls[`measure`].enable();
                  this.ignoreChange = true;
                  this.model.controls[`measure`].reset();
                } else if (!!value?.measure) {
                  console.log(333333333);
                  this.ignoreChange = true;
                  this.model.controls[`measure`].setValue('Wpisz produkt');
                  this.ignoreChange = true;
                  this.model.controls[`measure`].disable();
                }
                this.isMeasureDuplicated = !!products.find(({ name }) => name === value.product)?.measures
                  .find(({ measureId }) => measureId === this.typedMeasureId);
                this.modelClone = { ...value };
                console.log('Kopia');
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
    console.log('Wyemitowano used product:');
    this.addUsedProduct.emit(this.model.value);
    this.model.reset();

  }

  disabled() {
    return false;
  }

  addProduct(newProduct) {
    this.addedProduct.emit(newProduct);
  }

  deleteProdMeasure([measureId, productId]) {
    this.prodMeasureDeleted.emit([measureId, productId]);
  }
}
