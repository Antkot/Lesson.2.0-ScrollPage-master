import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Dish, Dishes } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DishStorageService {
  dishesList$ = new BehaviorSubject<Array<Dishes>>([]);

  constructor() {

    if (!!localStorage.dishesListData) {
    } else {
      this.dishesList$.next([
        // { dishId: cuid(), name: 'Pierogi', tags: [{hashId: cuid()}] },
      ]);
    }

  }
}
