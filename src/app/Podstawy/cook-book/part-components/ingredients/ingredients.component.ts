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

  usedProductToAdd: UsedProduct = {
    usedProductId: '',
    productId: '',
    measuresId: '',
    amount: 0
  };
  @Output() addUsedProduct = new EventEmitter();
  products$: Observable<Array<Product>> = this.productsService.products$;
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  @Input() edit;
  @Input() products: Array<{ usedProductId: string }>;


  constructor(private productsService: ProductsStorageService, private measureService: MeasuresStorageService, private fb: FormBuilder) {
  }

  newUsedProduct() {
    console.log(cuid());
    console.log(this.selectedProduct);
    console.log(this.selectedAmount);
    console.log(this.selectedMeasure);
    this.usedProductToAdd.usedProductId = cuid();
    this.usedProductToAdd.productId = this.selectedProduct;
    this.usedProductToAdd.measuresId = this.selectedMeasure;
    this.usedProductToAdd.amount = this.selectedAmount;
    this.addUsedProduct.emit(this.usedProductToAdd);
  }

}
