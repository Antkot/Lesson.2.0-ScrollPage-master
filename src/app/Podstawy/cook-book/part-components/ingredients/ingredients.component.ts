import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { Dish, Hash, Measure, Product, UsedProduct } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MeasuresStorageService } from '../services/measures-storage.service';
import * as cuid from 'cuid';
import { FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import Fuse from 'fuse.js';
import { forEach } from 'lodash';
import { number } from '@storybook/addon-knobs';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  @Output() addUsedProduct = new EventEmitter();
  @Output() addedProduct = new EventEmitter();
  products$: Observable<Array<Product>> = this.productsService.products$;
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  @Input() edit: boolean;
  @Input() products: Array<{ usedProductId: string }>;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  autoMeasure$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  model = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(1)]],
    measure: ['', [Validators.required, Validators.minLength(1)]],
    amount: ['', [Validators.required, Validators.min(1)]]
  });

  usedMeasures$: Observable<Array<{ measureId: string; kcal: number; }>> = this.products$.pipe(
    map((product) => {
      return product.find(
        ({ productId, name }) =>
          productId === this.model.value.name
      ).measures;
    }));

  // usedMeasuresNames$: Observable<Array<string>> = combineLatest([this.measures$, this.usedMeasures$]).pipe(map(([measures, usedMeasures]) => {
  //     measures.find(({measureId}) => usedMeasures.measureId ===   );
  // });
  // }));




  constructor(
    private productsService: ProductsStorageService,
    private measureService: MeasuresStorageService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.products === undefined) {
      this.products = [];
    }


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
      this.measures$.pipe(first()).subscribe((measures) => {
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
}
