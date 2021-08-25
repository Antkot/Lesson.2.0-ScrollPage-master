import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DishStorageService {
  dishes$ = new BehaviorSubject<Array<Dish>>([]);

  constructor() {

    if (!!localStorage.dishData) {
    } else {
      this.dishes$.next([
        { dishId: cuid(), name: 'śniadanie' },
        { dishId: cuid(), name: 'obiad' },
        { dishId: cuid(), name: 'kolacja' },
        { dishId: cuid(), name: 'desery' },
        { dishId: cuid(), name: 'launch' },
        { dishId: cuid(), name: 'inne' }
      ]);
    }

  }
}
