import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator, AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators
} from '@angular/forms';
import { catchError, distinctUntilChanged, filter, first, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { BehaviorSubject, Observable, of } from 'rxjs';
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
import { date } from '@storybook/addon-knobs';

// function priceHigherThanZero(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const priceSet = Array.isArray(control.value)
//       ? control.value.reduce(
//         (prev, { price }) => prev + (typeof price === 'number' ? price : 0),
//         0
//       )
//       : false;
//     const er = !priceSet ? { priceNotSet: true } : null;
//     console.log(er);
//     return er;
//   };
// }

@Component({
  selector: 'app-fourth',
  templateUrl: './dish-formule.component.html',
  styleUrls: ['./dish-formule.component.scss']
})
export class DishFormuleComponent extends AbstractValueAccessor implements OnInit {
  oldModel: string;
  addedDish: string;
  operatingAtIndex: number;
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
                new FormGroup({
                  dish: new FormControl(dish, {
                    validators: [Validators.minLength(4)],
                    asyncValidators: [this.validator()]
                  })
                }));
            });
          updateInProgress = false;
        })
      ),
      // this.forms.valueChanges.pipe(
      //   filter(() => !updateInProgress),
      //   tap((currentValue) => {
      //     updateInProgress = true;
      //     updateInProgress = false;
      //
      //   })
      // ),
      this.forms.valueChanges.pipe(
        filter((value) => JSON.stringify(value) !== this.oldModel && !updateInProgress),
        tap((currentValue) => {
          updateInProgress = true;
          this.oldModel = JSON.stringify(currentValue);
          const dish = this.forms.controls[0].get('dish');
          dish.setAsyncValidators([this.validator()]);
          this.forms.updateValueAndValidity();
          this.writeValue(currentValue);
          this.autocomplete(currentValue);
          updateInProgress = false;
        })
      )
    );
  }

  validator(): AsyncValidatorFn {
    console.log('Validator running');
    return (input: AbstractControl): Observable<{ [key: string]: any }> => {
      console.log('INPUT DATA: ', input);
      return this.dishesList$.pipe(
        map((dishesList) => {
          const x = this.change(dishesList, input.value);
          return !!x ? null : { valid: 'ffff', nomatch: true };
        }), take(1)
      );
    };
    // return {nomatch: true};
  }

  change(dishesList, dish) {
    // const value =
    return dishesList.find(({ dishId }) => dishId === dish);
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        dish: new FormControl(``, { validators: [Validators.minLength(4)], asyncValidators: [this.validator()] })
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

          // console.log(this.dishesListCombine$.value);
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
    this.addedDish = cuid();
    this.edition$.next(true);
    const dialogRef = this.dialog.open(AddRecipeComponent, { data: { data: this.addedDish } });

    dialogRef.componentInstance.editionEnded.pipe(takeUntil(dialogRef.afterClosed())).subscribe((result: string) => {
      console.table(result);
    });

    dialogRef.componentInstance.closed.pipe(takeUntil(dialogRef.afterClosed())).subscribe(({ data }) => {
      dialogRef.close();

      this.forms.at(this.operatingAtIndex).patchValue(
        { dish: this.addedDish });
    });
  }

  searchChange() {
    this.productSearch = true;
  }

  operating(index) {
    this.operatingAtIndex = index;
  }
}

