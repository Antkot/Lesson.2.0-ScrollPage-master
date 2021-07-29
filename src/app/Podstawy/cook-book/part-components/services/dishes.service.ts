import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../../types';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  dishes$ = new BehaviorSubject<Array<Dish>>([]);

  constructor() {


    if (!!localStorage.dishlog) {
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
  }
}
