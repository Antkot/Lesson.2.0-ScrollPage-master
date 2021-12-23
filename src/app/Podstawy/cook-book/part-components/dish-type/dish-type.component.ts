import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Dish, DishType } from '../../types';
import { LoadingService } from '../services/loading.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { filter, first, map, take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DishStorageService } from '../services/dish-storage.service';
import { AliveState } from '../../../../ActiveState';

@Component({
  selector: 'app-dish-type',
  templateUrl: './dish-type.component.html',
  styleUrls: ['./dish-type.component.scss']
})
export class DishTypeComponent
  extends AliveState
  implements OnInit {
  dishesType$: Observable<Array<DishType>> = this.loadingService.dishes$;
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  dishId$: Observable<any> = combineLatest([this.route.url.pipe(
    map(value => value[1].path))]);
  copiedDishes$: Observable<Dish> = this.dishService.dishesListCopied$;
  selectedDishes$: Observable<Array<{ dishId: string }>> = this.copiedDishes$.pipe(map((dishes) => {
      return dishes.dishType;
    }
  ));
  validateDishType$: Observable<boolean> = this.selectedDishes$.pipe(map((value) => {
      console.log(value.length);
      return !!value.length;
    }
  ));
  edition$ = this.loadingService.edition$;
  model = this.fb.group(
    {});
  @Output() typeOfDish = new EventEmitter();
  @Input() dishTypes = [];
  controlDishType = [];
  dishes$ = combineLatest([
    this.selectedDishes$,
    this.dishesType$])
    .pipe(
      map(([
             selectedDishes,
             dishesType]) => {
        const model = dishesType.reduce(
          (obj, { dishId }) => ({
            ...obj,
            [dishId]: !!selectedDishes.find((s) => s.dishId === dishId)
          }),
          {}
        );
        console.log(1111111111, JSON.stringify(model), JSON.stringify(this.model.value));

        if (JSON.stringify(model) !== JSON.stringify(this.model.value)) {
          console.log('informacja');
          Object.keys(model).forEach((patchKey) => {
            this.model.addControl(patchKey, new FormControl());
          });
          this.model.setValue(model, { emitEvent: false });
        } else {
          // nie ma else
          console.log('DZIECKO:');
          console.log(this.dishTypes[0]);
          console.log(this.model.value);
          // this.model.setValue(this.dishTypes[0]);
          // !!! ^
        }

        console.log(this.dishTypes[0]);
        console.log(this.model.value);

        console.log(222222, JSON.stringify(model), JSON.stringify(this.model.value));
        this.selectedDishes$.pipe(first()).subscribe(value => console.log(3, value));
        return dishesType.map(({ dishId }) => (dishId));
      }));

  // selectedDishes$ = this.dishesList$.pipe(
  //   map((dish) => {
  //     return dish.find(
  //       ({ dishId }) =>
  //         dishId === this.dishId
  //     ).dishType;
  //   }));



  constructor(private dishService: DishStorageService,
              private dishesService: DishStorageService,
              private route: ActivatedRoute,
              private loadingService: LoadingService,
              private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectedDishes$.pipe(first()).subscribe(value => console.log(value));
    console.log('this.dishTypes');
    console.table(this.dishTypes);
    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        filter(model => model?.['1'] !== null),
        tap(model => {
            console.log(this.model.value);
            if (model?.['1'] !== null) {
              const dishesId = Object.entries(model).filter((value) => !!value[1]).map((value) => ({ dishId: value[0] }));
              // if (JSON.stringify(this.controlDishType) !== JSON.stringify(dishesId)) {
              this.controlDishType = dishesId;
              this.typeOfDish.emit(dishesId);
              // }
            }
          }
        )
      )
    );
  }
}
