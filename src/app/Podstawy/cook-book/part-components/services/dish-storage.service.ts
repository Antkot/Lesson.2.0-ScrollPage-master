import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, Dishes, Hashes } from '../../types';
import { TagsStorageService } from './tags-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DishStorageService {
  dishesList$ = new BehaviorSubject<Array<Dishes>>([]);

  constructor(private tagsService: TagsStorageService) {

    if (!!localStorage.dishesListData) {
    } else {
      this.dishesList$.next([
        {
          dishId: cuid(),
          name: 'Pierogi ze storage',
          steps: ['1', '2 krok', 'ugotój'],
          products: [{ productId: '11' }],
          tags: [{ hashId: 'fff' }]
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotój', 'ugotój'],
          products: [{ productId: '11' }],
          tags: [{ hashId: 'fff' }]
        }
      ]);
    }
  }
}
