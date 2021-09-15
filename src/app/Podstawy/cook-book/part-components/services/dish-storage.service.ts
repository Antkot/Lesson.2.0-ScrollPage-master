import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dishes, Hash } from '../../types';
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
          steps: ['1', '2 krok', 'ugotuj'],
          products: [{  usedProductId: null }, { usedProductId: null }],
          tags: [{ hashId: 'fff' }],
          dishType: [{dishId: '1'}]
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotuj', 'ugotuj'],
          products: [{  usedProductId: null }],
          tags: [{ hashId: 'fff' }],
          dishType: [{dishId: '1'}]
        }
      ]);
    }
  }
}
