import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Dish } from '../../types';
import { DishStorageService } from '../services/dish-storage.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as cuid from 'cuid';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.scss']
})
export class ListedComponent implements OnInit {
  randomDishId = cuid();
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  dishType$: Observable<string> = combineLatest([this.activatedRoute.paramMap
    .pipe(map(() => history.state))]).pipe(map(([{ dishTypeId }]) => {
    return dishTypeId;
  }));

  dishes = [];
  shownDishesList$: Observable<Array<Dish>> = combineLatest([this.dishType$, this.dishesList$]).pipe(
    map(([dishTyped, dishesList]) => {
      return dishesList.filter(({ dishType }) => dishType.find(({ dishId }) => dishId === dishTyped));
    }));

  constructor(private dishesService: DishStorageService, public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  deleteDish(dishId: string) {
    this.dishesService.deleteDish(dishId);
  }
}
