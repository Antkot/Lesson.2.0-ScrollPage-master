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
        { dishId: cuid(), name: 'Pierogi', tags: [{hashId: 'cktaebvpx00013a9uhhg9u3gc'}] },
        { dishId: cuid(), name: 'Pierogi2', tags: [{hashId: 'fff'}] },
      ]);
    }
  }
}
