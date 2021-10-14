import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { Dish, Hash, Measure, Product } from '../../types';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { ProductsStorageService } from '../services/products-storage.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Fuse from 'fuse.js';
import { filter, first, map, take, tap } from 'rxjs/operators';
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
    // name: new FormControl({ value: '', disabled: this.disabled }),
    product: ['', [Validators.required, Validators.minLength(1)]],
    allergens: [[{ allergenId: '' }], []],
    kcal: ['', [Validators.required, Validators.min(0)]],
    measure: ['', [Validators.required, Validators.minLength(1)]]
  });
  finalCombine$ = new BehaviorSubject<Array<Measure>>([]);
  typedMeasureId = '';
  isMeasureDuplicated: boolean;
  oldProduct = '';

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
        tap(({ product, allergens, kcal, measure }) => {
          this.products$.pipe(first()).subscribe((products) => {
            this.measures$.pipe(first()).subscribe((measures) => {
              this.finalCombine$.next(measures.filter(({ measureId }) =>
                !products.find(({ name }) => name === product) || (!products.find(({ name }) => name === product)
                  .measures.find((m) => m.measureId === measureId))));
            });
            this.counter(product, allergens, kcal, measure);

            // console.log('TU PACZ MODEL (Jest)');
            // console.log(this.model.value.allergens);


            this.measures$.pipe(first()).subscribe((measures) => {
              this.typedMeasureId = measures.find(({ name }) => name === measure)?.measureId;
            });

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
            console.log(111111111, this.typedMeasureId);
            products.find(({ name }) => name === product)?.measures.find(({ measureId }) => measureId === this.typedMeasureId)
              ? console.log('Kopia miary wprowadzona! - zmiana przycisku') : console.log('Nowa miara');
            products.find(({ name }) => name === product)?.measures.find(({ measureId }) => measureId === this.typedMeasureId)
              ? this.isMeasureDuplicated = true : this.isMeasureDuplicated = false;
          });
        })
      )
    );

    this.model.valueChanges.subscribe(({ product, measure, allergens, kcal }) => {
      // this.products$.pipe(first()).subscribe((products) => {
      //
      // });
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

  counter(product, allergens, kcal, measure) {
    if (this.oldProduct !== product) {
      this.products$.pipe(first()).subscribe((products) => {
        if (!!products.find(({ name }) => name === product)) {
          this.model.setValue({
            product,
            allergens: (products.find(({ name }) => name === product).allergens),
            kcal,
            measure
          }, { emitEvent: false });
        }
      });
    }
    this.oldProduct = product;
  }

  newProduct() {
    this.addProduct.emit({ product: this.model.value, duplicateState: this.isMeasureDuplicated });
    this.model.reset();
  }

  deleteProdMeasure(measureId, productId) {
    const bothId: { givenMeasureId: string, givenProductId: string} = { givenMeasureId: measureId, givenProductId: productId };
    this.prodMeasureDeleted.emit(bothId);
  }

}
