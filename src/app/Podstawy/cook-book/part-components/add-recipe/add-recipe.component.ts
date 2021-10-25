import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish, UsedProduct } from '../../types';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { DishStorageService } from '../services/dish-storage.service';
import { stringify } from 'querystring';
import { number } from '@storybook/addon-knobs';
import { AliveState } from '../../../../ActiveState';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent
  extends AliveState
  implements OnInit {
  @Output() prodMeasureDeleted = new EventEmitter();
  @Output() usedProductToAdd = new EventEmitter();
  @Output() addedProduct = new EventEmitter();
  @Output() nameChange = new EventEmitter();
  @Output() typeChange = new EventEmitter();
  @Output() newStep = new EventEmitter();
  @Output() deletedStep = new EventEmitter();
  @Output() editStep = new EventEmitter();
  @Output() reindexStep = new EventEmitter();
  @Output() editionEnded = new EventEmitter();
  @Input() edit = true;
  @Input() reset = false;
  dishesList$: Observable<Array<Dish>> = this.dishService.dishesList$;
  dishesListCopied$ = this.dishService.dishesListCopied$;
  editionInProgress$ = new BehaviorSubject<boolean>(false);
  dishId$ = this.route.url.pipe(
    map(value => value[1].path));
  recipe$: Observable<Dish> = combineLatest([this.dishId$, this.dishesList$]).pipe(map(([id, dishesList]) => {
    const recipe = dishesList.find(({ dishId }) => dishId === id) ?? {
      dishId: '',
      name: '',
      tags: [],
      steps: [],
      products: [],
      dishType: []
    };
    this.model.setValue({ name: recipe.name, type: recipe.dishType }
    );
    return recipe;
  }));
  model = this.fb.group({
    name: ['', [Validators.required]],
    type: [[], []]
  });

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              public myRouter: Router,
              private dishService: DishStorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dishesListCopied$.subscribe(
      value => {
        if (value === { dishId: '', name: '', tags: [], steps: [], products: [], dishType: [] }) {
          this.editionInProgress$.next(false);
        } else {
          this.editionInProgress$.next(true);
        }
      });


    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        tap((value: { name: string }) => {
            console.log('nowa nazwa: ', value.name);
            // this.nameChange.emit(this.model.value.name);
          }
        )));

  }

  nameChanged() {
    console.log('Wykryto zmianę nazwy');
    console.log(this.model.value.name);
    this.nameChange.emit(this.model.value.name);
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
    if (this.edit === true) {
      this.nameChanged();
    }
    this.edit = !this.edit;

  }

  addUsedProduct(newUsedProduct: { product: string, measure: string, amount: number }) {
    this.usedProductToAdd.emit(newUsedProduct);
  }

  addProduct(newProduct: { duplicateState: boolean, product: { product: string, measure: string, kcal: number, allergens: Array<string> } }) {
    this.addedProduct.emit(newProduct);
  }

  redirectTo() {
    this.edit = true;
  }


  typeEdition(newTypes: Array<{ dishType: string }>) {
    const name = this.model.value.name;
    this.model.setValue(
      {
        name,
        type: newTypes
      }
    );
    this.typeChange.emit(this.model.value.type);
  }

  deleteProdMeasure(deletedMeasure: { givenMeasureId: string, givenProductId: string }) {
    this.prodMeasureDeleted.emit(deletedMeasure);
  }

  endEdition() {
    this.editionEnded.emit();
  }
}

// function customV(): ValidatorFn {
// JSON.stringify(this.model.value.type);
// return (control: AbstractControl): { [key: string]: any } | null =>
//   control.value?.toLowerCase() === 'blue'
//     ? null : {wrongColor: control.value};
// return null;
// }

