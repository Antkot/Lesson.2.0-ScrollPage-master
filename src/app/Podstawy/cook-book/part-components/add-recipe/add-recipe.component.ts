import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AddedProductType, AddedUsedProductType, BothIdType, Dish } from '../../types';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { DishStorageService } from '../services/dish-storage.service';
import { AliveState } from '../../../../ActiveState';
import { LoadingService } from '../services/loading.service';
import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { values } from 'lodash';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { number } from '@storybook/addon-knobs';
import { ProductsStorageService } from '../services/products-storage.service';
import { UsedProductsStorageService } from '../services/used-products-storage.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent
  extends AliveState
  implements OnInit {
  edition$ = this.loadingService.edition$;
  @Output() prodMeasureDeleted = new EventEmitter();
  @Output() usedProductToAdd = new EventEmitter();
  @Output() usedProductToDelete = new EventEmitter();
  @Output() addedProduct = new EventEmitter();
  @Output() nameChange = new EventEmitter();
  @Output() typeChange = new EventEmitter();
  @Output() newStep = new EventEmitter();
  @Output() deletedStep = new EventEmitter();
  @Output() editStep = new EventEmitter();
  @Output() reindexStep = new EventEmitter();
  @Output() editionEnded = new EventEmitter();
  nameOfDish = { name: '' };
  @Input() reset = false;
  @Input() dishId = this.route.url.pipe(
    map(value => value[1].path));
  recipe$: Observable<Dish> = this.dishService.dishesListCopied$;
  browserRefresh = false;
  filteredDishType$: Observable<string> = this.loadingService.filteredDishType$;
  model = this.fb.group({
    name: ['', [Validators.required]],
    type: [[], [Validators.required]]
  });
  realId;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsStorageService,
    private usedProductService: UsedProductsStorageService,
    @Inject(MAT_DIALOG_DATA) public data: { data: string },
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dishService: DishStorageService,
    private loadingService: LoadingService
  ) {
    super();

  }


  ngOnInit(): void {
    console.log(!!this.data);
    if (!!this.data) {
      this.realId = this.data.data;
    } else {
      this.dishId.pipe(first()).subscribe(value => this.realId = value);
    }
    console.log('this.data');
    console.log(this.data.data);
    console.log('dishID');
    console.log(this.dishId);
    // this.route.url.pipe(
    //   map(value => value[1].path)).pipe(first()).subscribe(url => this.dishService.editCheckStorage(url)
    // );
    this.dishService.editCheckStorage(this.realId);
    this.recipe$.pipe(first()).subscribe(value => {
        this.model.controls[`name`].setValue(value.name, { emitEvent: false });
        console.log('value');
        console.log(value);
      }
    );
    // this.dishService.newDish(this.realId);

    // this.route.url.pipe(
    //   map(value => value[1].path)).pipe(first()).subscribe(url => this.dishService.newDish(url)
    // );
    this.filteredDishType$.pipe(first()).subscribe(dishId => {
      console.log('TUT: ', dishId);
      this.model.controls[`type`].setValue([{ dishId }]);
      this.typeChange.emit(this.model.value.type);
    });
    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        tap((value: { name: string }) => {
            if (this.nameOfDish.name !== value.name) {
              this.nameOfDish = { name: value.name };
              // this.nameChange.emit(value.name);
              this.dishService.nameChange(value.name, this.realId);
            }
          }
        )));
  }


  // deletedStepEmitter(index: number) {
  //   this.deletedStep.emit(index);
  // }

  // editStepEmitter(editedStep: { step: string, index: number }) {
  //   this.editStep.emit(editedStep);
  // }

  // newStepEmitter(newStep: string) {
  //   console.log('step emitted in add-recipe.ts');
  //   this.newStep.emit(newStep);
  // }

  // reindexStepEmitter(reindex: { previousIndex: number, currentIndex: number }) {
  //   this.reindexStep.emit(reindex);
  // }

  editable() {
    this.edition$.next(false);
  }

  // addUsedProduct(newUsedProduct: { product: string, measure: string, amount: number }) {
  //   this.usedProductToAdd.emit(newUsedProduct);
  // }

  // addDeletedProduct(productId: string) {
  //   this.usedProductToDelete.emit(productId);
  // }

  // addProduct(newProduct: { duplicateState: boolean, product: { product: string, measure: string, kcal: number, allergens: Array<string> } }) {
  //   this.addedProduct.emit(newProduct);
  // }
  //
  redirectTo() {
    this.edition$.next(true);
  }
  //
  //
  // typeEdition(newTypes: Array<{ dishType: string }>) {
  //   console.log(newTypes);
  //   const name = this.model.value.name;
  //   this.model.setValue(
  //     {
  //       name,
  //       type: newTypes
  //     }
  //   );
  //   console.table(this.model.controls[`type`].value);
  //   this.typeChange.emit(this.model.value.type);
  // }
  //
  // deleteProdMeasure(deletedMeasure: { givenMeasureId: string, givenProductId: string }) {
  //   this.prodMeasureDeleted.emit(deletedMeasure);
  // }
  //
  // endEdition() {
  //   this.editionEnded.emit();
  // }
  endDialog() {
    this.editionEnded.emit(this.model.value.name);
  }

  nameEdited(newName: string) {
    console.log(111111111111111111111);
    console.log('nazwa zmieniona');
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.nameChange(newName, dishId)
    // );
    this.dishService.nameChange(newName, this.realId);
  }

  addUsedProduct(newUsedProduct: AddedUsedProductType) {
    const newProd = this.usedProductService.addProduct(newUsedProduct);
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.addProduct(newProd, dishId)
    // );
    this.dishService.addProduct(newProd, this.realId);
  }

  deleteUsedProduct(deletedProductId: string) {
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.deleteProduct(deletedProductId, dishId)
    // );
    this.dishService.deleteProduct(deletedProductId, this.realId);
  }

  addProduct(newProduct: AddedProductType) {
    this.productService.addProduct(newProduct);
  }

  newStepEmitter(newStep: string) {
    console.log('error here?');
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.newStep(newStep, dishId)
    // );
    this.dishService.newStep(newStep, this.realId);
  }

  deletedStepEmitter(index: number) {
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.deleteStep(index, dishId)
//    );
    this.dishService.deleteStep(index, this.realId);
  }

  editStepEmitter(editedStep: { step: string, index: number }) {
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.editStep(editedStep, dishId)
    // );
    this.dishService.editStep(editedStep, this.realId);
  }

  reindexStepEmitter(reindex: { previousIndex: number, currentIndex: number }) {
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.reindexStep(reindex, dishId)
    // );
    this.dishService.reindexStep(reindex, this.realId);
  }


  typeEdition(newTypes: Array<{ dishId: string }>) {


    console.log(newTypes);
    const name = this.model.value.name;
    this.model.setValue(
      {
        name,
        type: newTypes
      }
    );
    console.table(this.model.controls[`type`].value);
    this.typeChange.emit(this.model.value.type);


    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.typeChange(dishType, dishId)
    // );
    this.dishService.typeChange(newTypes, this.realId);
  }

  deleteProdMeasure(bothId: BothIdType) {
    this.productService.deleteProdMeasure(bothId);
  }

  endEdition() {
    // this.dishId$.pipe(first()).subscribe((dishId) =>
    //   this.dishService.endEdition(dishId)
    // );
    this.dishService.endEdition(this.realId);
  }

}
