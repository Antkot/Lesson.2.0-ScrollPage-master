import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { Hash, Measure, Product } from '../../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsStorageService } from '../services/products-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import Fuse from 'fuse.js';
import { first } from 'rxjs/operators';
import { AllergensStorageService } from '../services/allergens-storage.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  products$: Observable<Array<Product>> = this.productService.products$;
  allergens$: Observable<Array<Hash>> = this.allergenService.allergens$;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  autoMeasure$ = new BehaviorSubject<Array<{ name: string, measureId: string }>>([]);
  @Output() close = new EventEmitter();
  @Output() addProduct = new EventEmitter();
  selectedName: string;
  selectedProductId: string;
  selectedMeasureId: string;
  selectedMeasureKcal: number;

  model = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(1)]],
    allergens: [[]],
    kcal: ['', [Validators.required, Validators.min(0)]],
    measure: ['', [Validators.required, Validators.minLength(1)]]
  });

  constructor(
    private allergenService: AllergensStorageService,
    private measureService: MeasuresStorageService,
    private productService: ProductsStorageService,
    private fb: FormBuilder) {
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

  newProduct() {
    this.addProduct.emit(this.model.value);
    this.model.reset();
  }
}
