import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Dish } from '../../types';
import { DishStorageService } from '../services/dish-storage.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as cuid from 'cuid';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.scss']
})
export class ListedComponent implements OnInit {
  randomDishId = cuid();
  filteredDishType$: Observable<string>  = this.loadingService.filteredDishType$;
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  dishType$: Observable<string> = combineLatest([this.activatedRoute.paramMap
    .pipe(map(() => history.state))]).pipe(map(([{ dishTypeId }]) => {
    return dishTypeId;
  }));

  dishes = [];
  // shownDishesList$: Observable<Array<Dish>> = combineLatest([this.dishType$, this.dishesList$]).pipe(
  shownDishesList$: Observable<Array<Dish>> = combineLatest([this.filteredDishType$, this.dishesList$]).pipe(
    map(([dishTyped, dishesList]) => {
      return dishesList.filter(({ dishType }) => dishType.find(({ dishId }) => dishId === dishTyped));
    }));

  constructor(private dishesService: DishStorageService, public activatedRoute: ActivatedRoute, private loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }

  deleteDish(dishId: string) {
    this.dishesService.deleteDish(dishId);
  }
}
