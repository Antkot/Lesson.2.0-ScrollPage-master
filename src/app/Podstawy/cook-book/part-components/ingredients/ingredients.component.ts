import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { Dish, Hash, Measure, Product, UsedProduct } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MeasuresStorageService } from '../services/measures-storage.service';
import * as cuid from 'cuid';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, first, map, tap } from 'rxjs/operators';
import Fuse from 'fuse.js';
import { forEach, result } from 'lodash';
import { number } from '@storybook/addon-knobs';
import { AliveState } from '../../../../ActiveState';


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
    measure: ['', [Validators.required, Validators.minLength(1)]],
    // amount: ['', [this.model.value.product.length === 0,  Validators.required, Validators.min(1)]]
    amount: ['', [Validators.required, Validators.min(1)]]
  });
  chosenProd$ = new BehaviorSubject<boolean>(false);
  finalCombine$ = new BehaviorSubject<Array<Measure>>([]);

  constructor(
    private productsService: ProductsStorageService,
    private measureService: MeasuresStorageService,
    private fb: FormBuilder) {
    super();
  }

  ngOnInit() {

    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        // filter(({ product }) => !!product),
        tap(({ product, measure }) => {
          this.products$.pipe(first()).subscribe((products) => {
            this.measures$.pipe(first()).subscribe((measures) => {
              this.finalCombine$.next(products.find(({ name }) => name === product)
                ? products.find(({ name }) => name === product)?.measures.map(({ measureId }) => ({
                  measureId,
                  name: measures.find((m) => m.measureId === measureId).name,
                  shortcut: measures.find((m) => m.measureId === measureId).shortcut
                })) : []);


                  // this.products$.pipe(first()).subscribe((products) => {
                  //   this.chosenProd$.next(
                  //     products.find(({ name }) => name === product) ? [true] : [false];
                  //     });

              // Tutaj
              // console.log(111111, measure);
              // products.find(({ name }) => name === product)?.measures.includes(measure)
              //   ? console.log('Kopia miary wprowadzona!') : console.log('Nowa miara');
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

  addProduct(newProduct) {
    this.addedProduct.emit(newProduct);
  }
  deleteProdMeasure([measureId, productId]) {
    this.prodMeasureDeleted.emit([measureId, productId]);
  }
}
