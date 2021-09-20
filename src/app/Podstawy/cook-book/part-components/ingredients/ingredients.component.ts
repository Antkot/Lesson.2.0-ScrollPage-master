import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { Hash, Measure, Product, UsedProduct } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MeasuresStorageService } from '../services/measures-storage.service';
import * as cuid from 'cuid';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  selectedProduct: string;
  selectedAmount: number;
  selectedMeasure: string;
  @Output() addUsedProduct = new EventEmitter();
  products$: Observable<Array<Product>> = this.productsService.products$;
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  @Input() edit;
  @Input() products: Array<{ usedProductId: string }>;


  constructor(private productsService: ProductsStorageService, private measureService: MeasuresStorageService, private fb: FormBuilder) {
  }

  newUsedProduct() {
    this.addUsedProduct.emit(
      {
        usedProductId: cuid(),
        productId: this.selectedProduct,
        measuresId: this.selectedMeasure,
        amount: this.selectedAmount
      }
    );
  }

}
