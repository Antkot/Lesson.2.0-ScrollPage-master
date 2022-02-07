import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddedProductType, BothIdType, Dish, DishType, Measure, Product, UsedProduct } from '../../../types';
import { LoadingService } from '../../services/loading.service';
import { DishStorageService } from '../../services/dish-storage.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AbstractValueAccessor } from '../formControl';
import Fuse from 'fuse.js';
import { IngredientDialogComponent } from '../../ingredient-dialog/ingredient-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../../add-recipe/add-recipe.component';
import { UsedProductsStorageService } from '../../services/used-products-storage.service';
import { ProductsStorageService } from '../../services/products-storage.service';
import * as cuid from 'cuid';
import { stringify } from 'querystring';


@Component({
  selector: 'app-fourth',
  templateUrl: './dish-formule.component.html',
  styleUrls: ['./dish-formule.component.scss']
})
export class DishFormuleComponent extends AbstractValueAccessor implements OnInit {
  addedDish: string;
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  usedProducts$: Observable<Array<UsedProduct>> = this.usedProductsService.usedProducts$;
  products$: Observable<Array<Product>> = this.productsService.products$;
  edition$ = this.loadingService.edition$;
  @Output() dataSync = new EventEmitter();
  forms = this.fb.array([]);
  filteredOptions: Observable<string[]>;
  formCopy: Array<Dish>;
  edited = '';
  finalCombine: Array<any> = [];
  productSearch = false;
  keys: Array<string> = [];
  productArray: Array<{ product: string, productId: string }> = [];
  dishesListCombine$ = new BehaviorSubject<Array<{
    name: string,
    dishId: string,
    products: Array<{
      product: string,
      productId: string
    }>
  }>>([]);

  @Input() set dish(value: Array<{ day: string, meals: Array<{ meal: string, dishes: Array<{ dish: string }> }> }>) {
    this.forms.patchValue(value, { emitEvent: false });
  }

  constructor(
    private loadingService: LoadingService,
    private usedProductsService: UsedProductsStorageService,
    private productsService: ProductsStorageService,
    public dialog: MatDialog,
    public elementRef: ElementRef,
    @Self()
    @Optional()
    public ngControl: NgControl,
    private fb: FormBuilder,
    private dishesService: DishStorageService
  ) {
    super();
    this.ngControl.valueAccessor = this;
  }


  ngOnInit() {
    let updateInProgress = false;
    this.subscribeWhileAlive(
      this.valueSubject.pipe(
        filter(() => !updateInProgress),
        tap((currentValue) => {
          updateInProgress = true;
          currentValue.forEach(
            ({ dish }) => {
              this.forms.push(
                new FormGroup({ dish: new FormControl(dish) }));
            });
          updateInProgress = false;
        })
      ),
      this.forms.valueChanges.pipe(
        filter(() => !updateInProgress),
        tap((currentValue) => {
          updateInProgress = true;
          this.writeValue(currentValue);
          updateInProgress = false;
          this.autocomplete(currentValue);

        })
      ));

  }

  addForm() {
    this.forms.push(
      new FormGroup({
        dish: new FormControl(`Danie ${this.forms.value.length + 1}`)
      })
    );
  }

  remove(index) {
    this.forms.removeAt(index);
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;

    const from = event.previousIndex;
    const to = event.currentIndex;

    const temp = this.forms.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.forms.at(i + dir);
      this.forms.setControl(i, current);
    }
    this.forms.setControl(to, temp);
  }

  displayFn(givenDishId: string) {
    let dishName = '';
    if (!!givenDishId) {
      const selectedDish = this.dishesList$.pipe(
        map((dishes) => {
          return dishes.find(
            ({ dishId }) =>
              dishId === givenDishId
          )?.name;
        }));
      selectedDish.pipe(first()).subscribe(dishName$ => dishName = dishName$);
    }
    return dishName;
  }

  autocomplete(currentValue) {
    if (this.productSearch === false) {
      this.keys = [
        'name'
        // 'products.usedProductId'
      ];
    } else {
      this.keys = [
        'name',
        'products.product'
      ];
    }
    if (currentValue !== this.formCopy && !!currentValue && !!this.formCopy) {
      currentValue.forEach(
        ({ dish }, index) => {
          if (currentValue[index] !== this.formCopy[index]) {
            this.edited = currentValue[index].dish;
          }
        });
    }
    this.dishesList$.pipe(first()).subscribe(dishes => {
      this.usedProducts$.pipe(first()).subscribe(usedProducts => {
        this.products$.pipe(first()).subscribe(allProducts => {
          this.dishesListCombine$.next([]);
          this.productArray = [];
          dishes.forEach(({ dishId, name, products }) => {
            products.forEach(({ usedProductId }) => {
                const prodName = allProducts.find((value) =>
                  value.productId === (
                    usedProducts.find((usedValue) =>
                      usedProductId === usedValue.usedProductId
                    ).productId)).name;
                const prodId = allProducts.find((value) =>
                  value.productId === (
                    usedProducts.find((usedValue) =>
                      usedProductId === usedValue.usedProductId
                    ).productId)).productId;
                this.productArray.push({ product: prodName, productId: prodId });
              }
            );
            if (!!this.dishesListCombine$) {
              const current = this.dishesListCombine$.value;
              // console.log(current);
              this.dishesListCombine$.next([...current, {
                name,
                dishId,
                products: this.productArray
              }]);
            } else {
              this.dishesListCombine$.next([{
                name,
                dishId,
                products: this.productArray
              }]);
            }
          });

          console.log(this.dishesListCombine$.value);
          this.formCopy = currentValue;
          const options = {
            isCaseSensitive: false,
            // shouldSort: true,
            findAllMatches: true,
            // minMatchCharLength: 1,
            // location: 0,
            // threshold: 0.6,
            // distance: 100,
            // useExtendedSearch: false,
            ignoreLocation: true,
            keys: [...this.keys]
          };
          if (!!this.edited) {
            const fuse = new Fuse(this.dishesListCombine$.value, options);
            this.finalCombine = fuse.search(this.edited);
            // console.log(this.finalCombine);
          }
        });
      });
    });
  }

  open() {
    this.edition$.next(true);
    const dialogRef = this.dialog.open(AddRecipeComponent, { data: { data: cuid() } });
    dialogRef.componentInstance.editionEnded.pipe(takeUntil(dialogRef.afterClosed())).subscribe((result: string) => {
      this.addedDish = result;
    });
    dialogRef.componentInstance.editionEnded.pipe(takeUntil(dialogRef.afterClosed())).subscribe((result) => {
      console.table(result);
    });
  }

  searchChange() {
    this.productSearch = true;
  }

}
