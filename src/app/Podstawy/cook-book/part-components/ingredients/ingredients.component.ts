import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { Hash, Measure, Product, UsedProduct } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MeasuresStorageService } from '../services/measures-storage.service';
import * as cuid from 'cuid';
import { FormBuilder, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';
import Fuse from 'fuse.js';


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
  @Input() edit;
  @Input() products: Array<{ usedProductId: string }>;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);

  model = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(1)]],
    amount: ['', [Validators.required, Validators.min(1)]],
    measure: ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(
    private productsService: ProductsStorageService,
    private measureService: MeasuresStorageService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
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
    });
  }

  newUsedProduct() {
    console.log('model', this.model.value);
  }

  addProduct(event) {
    this.addedProduct.emit(event);
  }

  optionSelected(type: string, id: string) {
    switch (type) {
      case 'product': {
        this.products$.pipe(first()).subscribe((products) => {
          this.model.setValue({
            product: id,
            amount: this.model.value.amount,
            measure: this.model.value.measure
          });
        });
        break;
      }
      case 'measure': {
        this.measures$.pipe(first()).subscribe((measures) => {
          this.model.setValue({
            product: this.model.value.product,
            amount: this.model.value.amount,
            measure: id
          });
        });
        break;
      }
    }
    console.log('model', this.model.value);
  }
}
