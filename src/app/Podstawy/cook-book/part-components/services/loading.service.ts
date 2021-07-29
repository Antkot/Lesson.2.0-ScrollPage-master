import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish, Levels } from '../../types';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  dishes$ = new BehaviorSubject<Array<Dish>>([]);
  levels$ = new BehaviorSubject<Array<Levels>>([]);

  constructor() {


    if (!!localStorage.dishData) {
    } else {
      this.dishes$.next([
        {dishId: cuid(), name: 'śniadanie'},
        {dishId: cuid(), name: 'obiad'},
        {dishId: cuid(), name: 'kolacja'},
        {dishId: cuid(), name: 'desery'},
        {dishId: cuid(), name: 'launch'},
        {dishId: cuid(), name: 'inne'}
      ]);
    }
    if (!!localStorage.levelData) {
    } else {
      this.levels$.next([
        {levelId: cuid(), level: 1},
        {levelId: cuid(), level: 2},
        {levelId: cuid(), level: 3},
        {levelId: cuid(), level: 4},
        {levelId: cuid(), level: 5},
      ]);
    }
  }
}
