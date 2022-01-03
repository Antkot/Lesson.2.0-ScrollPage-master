import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../../types';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DishStorageService } from '../services/dish-storage.service';
import { AliveState } from '../../../../ActiveState';
import { LoadingService } from '../services/loading.service';


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
  dishId$ = this.route.url.pipe(
    map(value => value[1].path));
  recipe$: Observable<Dish> = this.dishService.dishesListCopied$;
  browserRefresh = false;
  filteredDishType$: Observable<string> = this.loadingService.filteredDishType$;
  model = this.fb.group({
    name: ['', [Validators.required]],
    type: [[], [Validators.required]]
  });


  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private dishService: DishStorageService,
              private loadingService: LoadingService,
  ) {
    super();

  }

  ngOnInit(): void {
    console.log('Add recipe initialised');
    this.route.url.pipe(
      map(value => value[1].path)).pipe(first()).subscribe(url => this.dishService.editCheckStorage(url)
    );
    this.recipe$.pipe(first()).subscribe(value => {
        this.model.controls[`name`].setValue(value.name, { emitEvent: false });
        console.log('value');
        console.log(value);
      }
    );

    this.route.url.pipe(
      map(value => value[1].path)).pipe(first()).subscribe(url => this.dishService.newDish(url)
    );
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
              this.nameChange.emit(this.model.value.name);
            }
          }
        )));
  }


  deletedStepEmitter(index: number) {
    this.deletedStep.emit(index);
  }

  editStepEmitter(editedStep: { step: string, index: number }) {
    this.editStep.emit(editedStep);
  }

  newStepEmitter(newStep: string) {
    this.newStep.emit(newStep);
  }

  reindexStepEmitter(reindex: { previousIndex: number, currentIndex: number }) {
    this.reindexStep.emit(reindex);
  }

  editable() {
    this.edition$.next(false);

  }

  addUsedProduct(newUsedProduct: { product: string, measure: string, amount: number }) {
    this.usedProductToAdd.emit(newUsedProduct);
  }
  addDeletedProduct(productId: string) {
    this.usedProductToDelete.emit(productId);
  }

  addProduct(newProduct: { duplicateState: boolean, product: { product: string, measure: string, kcal: number, allergens: Array<string> } }) {
    this.addedProduct.emit(newProduct);
  }

  redirectTo() {
    this.edition$.next(true);
  }


  typeEdition(newTypes: Array<{ dishType: string }>) {
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
  }

  deleteProdMeasure(deletedMeasure: { givenMeasureId: string, givenProductId: string }) {
    this.prodMeasureDeleted.emit(deletedMeasure);
  }

  endEdition() {
    this.editionEnded.emit();
  }

}
