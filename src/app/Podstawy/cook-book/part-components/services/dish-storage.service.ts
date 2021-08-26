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
        { dishId: cuid(), name: 'Pierogi', tags: [ 'Szpinak', 'Mięsko' ] },
        { dishId: cuid(), name: 'Pierogi z serem', tags: [ 'Ser', 'Laktoza', 'Wysokokaloryczne!' ] },
        { dishId: cuid(), name: 'Pierogi z kiełbasą', tags: [ 'Special'] },
        { dishId: cuid(), name: 'Pierogi2', tags: [ 'Szpinak', 'Mięsko' ] },
        { dishId: cuid(), name: 'Pierogi3', tags: [ 'Szpinak', 'Mięsko' ] },
        { dishId: cuid(), name: 'Zupka', tags: [] }
      ]);
    }

  }
}
