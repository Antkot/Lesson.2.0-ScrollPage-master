import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { Measure, Product, UsedProduct } from '../../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsStorageService } from '../services/products-storage.service';
import * as cuid from 'cuid';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Fuse from 'fuse.js';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  products$: Observable<Array<Product>> = this.productService.products$;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  @Input() name = 'Kuba';
  @Output() button = new EventEmitter();
  @Output() addProduct = new EventEmitter();
  selectedName: string;
  selectedProductId: string;
  selectedMeasureId: string;
  selectedMeasureKcal: number;
  selectedAllergen: Array<{ allergenId: string }>;

  model = this.fb.group({
    product: ['', []],
    allergens: [[]],
    kcal: [[]]
  });

  constructor(private measureService: MeasuresStorageService, private productService: ProductsStorageService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.model.valueChanges.subscribe(({ product }) => {
      this.products$.pipe(first()).subscribe((products) => {
        let result = null;
        if (product.length > 0 && product) {
          const options = {
            keys: ['name']
          };
          const fuse = new Fuse(products, options);

          result = fuse.search(product).map(({ item }) => item);
        } else {
          result = products;
        }
        this.autoProducts$.next(result.map(({ name, productId }) => ({ name, productId })));
      });
    });
  }

  optionSelected(value: string) {
    this.model.setValue({ product: value });
    console.log('Value: ', value);
  }

  newProduct() {
    this.addProduct.emit(
      {
        productId: this.selectedProductId,
        name: this.selectedName,
        measures: [{ measureId: this.selectedMeasureId, kcal: this.selectedMeasureKcal }],
        allergens: this.selectedAllergen
      }
    );
  }

}
