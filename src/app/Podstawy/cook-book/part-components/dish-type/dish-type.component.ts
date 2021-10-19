import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Dish, DishType } from '../../types';
import { LoadingService } from '../services/loading.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { RecipiePageComponent } from '../../main-components/recipie-page/recipie-page.component';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DishStorageService } from '../services/dish-storage.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-dish-type',
  templateUrl: './dish-type.component.html',
  styleUrls: ['./dish-type.component.scss']
})
export class DishTypeComponent implements OnInit {
  dishesType$: Observable<Array<DishType>> = this.loadingService.dishes$;
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  dishId$: Observable<any> = combineLatest([this.route.url.pipe(
    map(value => value[1].path))]);
  selectedDishes$ = combineLatest([this.dishId$, this.dishesList$]).pipe(map(([id, dishes]) => {
      console.log(11111111111111111, id);
      console.log(11111111111111111, dishes);
      console.table(dishes.find(({ dishId }) => dishId === id));
      return dishes.find(({ dishId }) => dishId === id).dishType.map(({ dishId }) => (dishId));
    }
  ));
  dishes$ = combineLatest([this.dishesList$, this.dishesType$, this.dishId$]).pipe(map(([dishesList, dishesType, id]) => {
    const model = dishesType.reduce(
      (obj, { dishId }) => ({
        ...obj,
        [dishId]: false
      }),
      {}
    );
    const recipe = dishesList.find(({ dishId }) => dishId === id);
    if (!!recipe) {
      recipe.dishType.forEach(({ dishId }) => {
      });
    }
    Object.keys(model).forEach((patchKey) => {
      this.model.addControl(patchKey, new FormControl());
    });
    this.model.setValue(model);
    return dishesType.map(({dishId}) => (dishId));
  }));
  // selectedDishes = this.selectedDishes$.pipe(first()).subscribe(value =>
  //   this.selectedDishes = value);
  //
  //
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

  constructor(private dishesService: DishStorageService, private route: ActivatedRoute, private loadingService: LoadingService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  chosenType() {
    // console.log(111111111);
    // console.table(this.model.value);
    // this.typeOfDish.emit(this.model.value.map());
    // console.log(this.selectedDishes);
  }
}
