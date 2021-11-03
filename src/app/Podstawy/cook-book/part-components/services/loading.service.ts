import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DishType, Level } from '../../types';
import * as cuid from 'cuid';
import { number } from '@storybook/addon-knobs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  levels$ = new BehaviorSubject<Array<Level>>([]);
  dishes$ = new BehaviorSubject<Array<DishType>>([]);
  edition$ = new BehaviorSubject(false);
  filteredDishType$ = new BehaviorSubject('1');

  constructor() {
    if (!!localStorage.levelData) {
    } else {
      this.levels$.next([
        { levelId: cuid(), level: 1 },
        { levelId: cuid(), level: 2 },
        { levelId: cuid(), level: 3 },
        { levelId: cuid(), level: 4 },
        { levelId: cuid(), level: 5 }
      ]);
    }

    if (!!localStorage.dishData) {
    } else {
      this.dishes$.next([
        { dishId: '1', name: 'śniadanie' },
        { dishId: '2', name: 'obiad' },
        { dishId: '3', name: 'kolacja' },
        { dishId: '4', name: 'desery' },
        { dishId: '5', name: 'launch' },
        { dishId: '6', name: 'inne' }
      ]);
    }

  }
}
