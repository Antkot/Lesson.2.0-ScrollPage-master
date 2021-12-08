import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map, tap } from 'rxjs/operators';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Dish, UsedProduct } from '../../types';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { DishStorageService } from '../services/dish-storage.service';
import { stringify } from 'querystring';
import { number } from '@storybook/addon-knobs';
import { AliveState } from '../../../../ActiveState';
import { LoadingService } from '../services/loading.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../services/local-storage-service';


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
  @Output() addedProduct = new EventEmitter();
  @Output() nameChange = new EventEmitter();
  @Output() typeChange = new EventEmitter();
  @Output() newStep = new EventEmitter();
  @Output() deletedStep = new EventEmitter();
  @Output() editStep = new EventEmitter();
  @Output() reindexStep = new EventEmitter();
  @Output() editionEnded = new EventEmitter();
  nameOfDish = { name: '' };
  // @Input() edit = true;
  @Input() reset = false;
  dishesList$: Observable<Array<Dish>> = this.dishService.dishesList$;
  dishId$ = this.route.url.pipe(
    map(value => value[1].path));
  recipe$: Observable<Dish> = this.dishService.dishesListCopied$;
  lastLink$ = this.loadingService.lastLink$;
  browserRefresh = false;
  filteredDishType$: Observable<string> = this.loadingService.filteredDishType$;
  dishesListCopied$ = this.dishService.dishesListCopied$;

  model = this.fb.group({
    name: ['', [Validators.required]],
    type: [[], []]
  });
  subscription: Subscription;


  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private dishService: DishStorageService,
              private loadingService: LoadingService,
              private router: Router,
              private localStorageService: LocalStorageService,
  ) {
    super();

  }

  ngOnInit(): void {
    this.dishService.erase();
    this.recipe$.pipe().subscribe(value => {
        this.model.controls['name'].setValue(value.name, { emitEvent: false });
      }
    );

    this.route.url.pipe(
      map(value => value[1].path)).pipe(first()).subscribe(url => this.dishService.newDish(url)
    );
    this.filteredDishType$.pipe(first()).subscribe(dishId => {
      this.model.controls['type'].setValue([{ dishId }]);
      console.log('xd');
      console.table(this.model.value.type);
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
    console.log('koniec');
    this.route.url.pipe(
      map(value => value[1].path)).pipe(first()).subscribe(url => this.dishService.editCheckStorage(url)
    );
    const current = JSON.parse(this.localStorageService.getItem('allergens'));
    // this.dishesListCopied$.next({
    //   ...current
    // });
    console.log('koniec2');
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

  addProduct(newProduct: { duplicateState: boolean, product: { product: string, measure: string, kcal: number, allergens: Array<string> } }) {
    this.addedProduct.emit(newProduct);
  }

  redirectTo() {
    this.edition$.next(true);
  }


  typeEdition(newTypes: Array<{ dishType: string }>) {
    const name = this.model.value.name;
    this.model.setValue(
      {
        name,
        type: newTypes
      }
    );
    console.table(this.model.controls['type'].value);
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

