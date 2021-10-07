import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { Dish, Hash, Measure, Product } from '../../types';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ProductsStorageService } from '../services/products-storage.service';
import { FormBuilder, Validators } from '@angular/forms';
import Fuse from 'fuse.js';
import { filter, first, map, tap } from 'rxjs/operators';
import { AllergensStorageService } from '../services/allergens-storage.service';
import { forEach } from 'lodash';
import { LocalStorageService } from '../services/local-storage-service';
import { AliveState } from '../../../../ActiveState';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent
  extends AliveState
  implements OnInit {
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  products$: Observable<Array<Product>> = this.productService.products$;
  allergens$: Observable<Array<Hash>> = this.allergenService.allergens$;
  autoProducts$ = new BehaviorSubject<Array<{ name: string, productId: string }>>([]);
  autoMeasure$ = new BehaviorSubject<Array<{ name: string, measureId: string }>>([]);
  @Output() close = new EventEmitter();
  @Output() addProduct = new EventEmitter();
  @Output() prodMeasureDeleted = new EventEmitter();
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
  finalCombine$ = new BehaviorSubject<Array<Measure>>([]);

  constructor(
    private localStorageService: LocalStorageService,
    private allergenService: AllergensStorageService,
    private measureService: MeasuresStorageService,
    private productService: ProductsStorageService,
    private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    // const current = JSON.parse(this.localStorageService.getItem('measures'));

    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        // filter(({ product }) => !!product),
        tap(({ product }) => {
          this.products$.pipe(first()).subscribe((products) => {
            this.measures$.pipe(first()).subscribe((measures) => {
              this.finalCombine$.next(measures.filter(({ measureId }) =>
                !products.find(({ name }) => name === product) || (!products.find(({ name }) => name === product)
                  .measures.find((m) => m.measureId === measureId))));
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

      // const current = this.model.value.allergens;
      // this.products$.pipe(first()).subscribe((products) => {
      //    (products.find(({ name }) => name === product) ? this.model.value.allergens.setValue(
      //      [
      //        ...current, (products.find(({ name }) => name === product).allergens)
      //      ])
      //    )});


    });
  }

  newProduct() {
    this.addProduct.emit(this.model.value);
    this.model.reset();
  }

  deleteProdMeasure([measureId, productId]) {
    this.prodMeasureDeleted.emit([measureId, productId]);
  }

}
