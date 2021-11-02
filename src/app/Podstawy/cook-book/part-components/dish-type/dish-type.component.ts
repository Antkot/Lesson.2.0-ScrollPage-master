import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Dish, DishType } from '../../types';
import { LoadingService } from '../services/loading.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { RecipiePageComponent } from '../../main-components/recipie-page/recipie-page.component';
import { filter, first, map, take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DishStorageService } from '../services/dish-storage.service';
import { cloneDeep } from 'lodash';
import { AliveState } from '../../../../ActiveState';
import { stringify } from 'querystring';

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
  selectedDishes$ = combineLatest([this.dishId$, this.dishesList$]).pipe(map(([id, dishes]) => {
      // console.log(11111111111111111, id[0]);
      // console.table(dishes.find(({ dishId }) => dishId === id[0]));
      return dishes.find(({ dishId }) => dishId === id[0])
        ? dishes.find(({ dishId }) => dishId === id[0]).dishType : [];
    }
  ));
  controlDishType = [];
  dishes$ = combineLatest([
    this.selectedDishes$,
    this.dishesType$])
    .pipe(
      map(([
             selectedDishes,
             dishesType]) => {
        // console.log(1111111);
        // console.table(dishesType);
        const model = dishesType.reduce(
          (obj, { dishId }) => ({
            ...obj,
            [dishId]: !!selectedDishes.find((s) => s.dishId === dishId)
          }),
          {}
        );
        // console.log(1111111111, JSON.stringify(model), JSON.stringify(this.model.value));
        if (JSON.stringify(model) !== JSON.stringify(this.model.value)) {
          Object.keys(model).forEach((patchKey) => {
            this.model.addControl(patchKey, new FormControl());
          });
          this.model.setValue(model, { emitEvent: false });
        }
        return dishesType.map(({ dishId }) => (dishId));
      }));
  // this.selectedDishes$.pipe(first()).subscribe(value => this.selectedDishes = value);


  // selectedDishes$ = this.dishesList$.pipe(
  //   map((dish) => {
  //     return dish.find(
  //       ({ dishId }) =>
  //         dishId === this.dishId
  //     ).dishType;
  //   }));
  //
  // selectedDishes = this.selectedDishes$.pipe(first()).subscribe(value => {
  //   return value;
  // });


  @Input() edit: boolean;
  model = this.fb.group(
    {});
  @Output() typeOfDish = new EventEmitter();

  constructor(private dishesService: DishStorageService,
              private route: ActivatedRoute,
              private loadingService: LoadingService,
              private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        filter(model => model?.['1'] !== null),
        tap(model => {
            if (model?.['1'] !== null) {
              const dishesId = Object.entries(model).filter((value) => !!value[1]).map((value) => ({ dishId: value[0] }));
              if (JSON.stringify(this.controlDishType) !== JSON.stringify(dishesId)) {
                this.controlDishType = dishesId;
                this.typeOfDish.emit(dishesId);
              }
            }
          }
        )
      )
    );
  }
}
