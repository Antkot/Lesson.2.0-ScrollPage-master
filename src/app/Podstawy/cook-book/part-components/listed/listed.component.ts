import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Dish } from '../../types';
import { LoadingService } from '../services/loading.service';
import { DishStorageService } from '../services/dish-storage.service';
import { first, map } from 'rxjs/operators';
import { xor } from 'lodash';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.scss']
})
export class ListedComponent implements OnInit {
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  dishType$: Observable<{ dishId: string; }>;
  dishes = [];
  constructor(private dishesService: DishStorageService) {
  }

  shownDishesList$: Observable<Dish> = combineLatest([this.dishType$, this.dishesList$]).pipe(map(([dishTyped, dishesList]) => {
    return dishesList.find(({ dishType }) => dishType.includes(dishTyped));
  }));

  ngOnInit(): void {
    this.dishesList$.pipe(first()).subscribe(value => {
      console.log('Dania: ', value);
      this.dishes = value;
    });
    console.log(this.dishes);
  }

  deleteDsih(dishId: string) {
    this.dishesService.deleteDish(dishId);
  }
}
