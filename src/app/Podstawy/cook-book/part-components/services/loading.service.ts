import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish, Level } from '../../types';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  levels$ = new BehaviorSubject<Array<Level>>([]);
  dishes$ = new BehaviorSubject<Array<Dish>>([]);

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
        { dishId: cuid(), name: 'obiad' },
        { dishId: cuid(), name: 'kolacja' },
        { dishId: cuid(), name: 'desery' },
        { dishId: cuid(), name: 'launch' },
        { dishId: cuid(), name: 'inne' }
      ]);
    }

  }
}
