import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { Hash, Measure, Product, UsedProduct } from '../../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsStorageService } from '../services/products-storage.service';
import * as cuid from 'cuid';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Fuse from 'fuse.js';
import { first } from 'rxjs/operators';
import { AllergensStorageService } from '../services/allergens-storage.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  allergens$: Observable<Array<Hash>> = this.allergenService.allergens$;
  products$: Observable<Array<Product>> = this.productService.products$;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  autoMeasure$ = new BehaviorSubject<Array<{ name: string, measureId: string }>>([]);
  @Input() name = 'Kuba';
  @Output() close = new EventEmitter();
  @Output() addProduct = new EventEmitter();
  selectedName: string;
  selectedProductId: string;
  selectedMeasureId: string;
  selectedMeasureKcal: number;
  selectedAllergen: Array<{ allergenId: string }>;

  model = this.fb.group({
    product: ['Kapusta', []],
    allergens: [[]],
    kcal: [0],
    measure: ['gramy']
  });

  constructor(private allergenService: AllergensStorageService, private measureService: MeasuresStorageService, private productService: ProductsStorageService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
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

  optionSelected(type: string, id: string) {
    console.log('typ', type, 'Value: ', id);
    switch (type) {
      case 'product': {
        this.products$.pipe(first()).subscribe((products) => {
          this.model.setValue({
            product: products.find(({ productId }) => productId === id).name,
            allergens: [],
            kcal: this.model.value.kcal,
            measure: this.model.value.measure
          });
        });
        break;
      }
      case 'measure': {
        this.measures$.pipe(first()).subscribe((measures) => {
          // console.table(measures);
          this.model.setValue({
            product: this.model.value.product,
            allergens: [],
            kcal: this.model.value.kcal,
            measure: measures.find(({ measureId }) => measureId === id).name
          });
        });
        break;
      }
    }
  }

  newProduct() {
    this.addProduct.emit(this.model.value);

    // this.addProduct.emit(
    //   {
    //     productId: this.selectedProductId,
    //     name: this.selectedName,
    //     measures: [{ measureId: this.selectedMeasureId, kcal: this.selectedMeasureKcal }],
    //     allergens: this.selectedAllergen
    //   }
    // );
  }

}
