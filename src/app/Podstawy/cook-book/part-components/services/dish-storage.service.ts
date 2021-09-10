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
  tags$: Observable<Array<Hashes>> = this.tagsService.tags$;

  constructor(private tagsService: TagsStorageService) {

    if (!!localStorage.dishesListData) {
    } else {
      this.dishesList$.next([
        {
          dishId: cuid(),
          name: 'Pierogi',
          steps: ['1', '2 krok', 'ugotój'],
          products: [{ productId: '11' }],
          tags: [{ hashId: 'cktaebvpx00013a9uhhg9u3gc' }]
        },
        {
          dishId: cuid(),
          name: 'Pierogi2',
          steps: ['1', '2 krok', 'ugotój', 'ugotój'],
          products: [{ productId: '11' }],
          tags: [{ hashId: 'fff' }]
        }
      ]);
    }
  }
}
