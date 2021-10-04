import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, Hash, UsedProduct } from '../../types';
import { TagsStorageService } from './tags-storage.service';
import { LocalStorageService } from './local-storage-service';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DishStorageService {
  dishesList$ = new BehaviorSubject<Array<Dish>>([]);

  constructor(private tagsService: TagsStorageService, private localStorageService: LocalStorageService, public myRouter: Router) {

    if (!!localStorage.dishList) {
      const current = JSON.parse(this.localStorageService.getItem('dishList'));
      this.dishesList$.next([...current]);
    } else {
      this.dishesList$.next([
        {
          dishId: cuid(),
          name: 'Pierogi ze storage',
          steps: ['1', '2 krok', 'ugotuj'],
          products: [{ usedProductId: 'used1' }, { usedProductId: 'used2' }],
          tags: [{ hashId: 'fff' }],
          dishType: [{ dishId: '1' }]
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotuj', 'ugotuj'],
          products: [{ usedProductId: 'used1' }],
          tags: [{ hashId: 'fff' }],
          dishType: [{ dishId: '1' }]
        }
      ]);
      this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
    }
  }

  addProduct(addedProduct: UsedProduct, givenDishId: string) {
    givenDishId = this.idCheck(givenDishId);
    this.dishesList$.pipe(first()).subscribe(value => console.log('DISH1', value));
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ products, ...value }) => ({
      ...value,
      products: value.dishId === givenDishId ? [...products, { usedProductId: addedProduct.usedProductId }] : products
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
    this.dishesList$.pipe(first()).subscribe(value => console.log('DISH2', value));
  }

  stepChange(event: Array<string>, givenDishId: string) {
    givenDishId = this.idCheck(givenDishId);
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ steps, ...value }) => ({
      ...value,
      steps: value.dishId === givenDishId ? event : steps
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  nameChange(event: string, givenDishId: string) {
    givenDishId = this.idCheck(givenDishId);
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ name, ...value }) => ({
      ...value,
      name: value.dishId === givenDishId ? event : name
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  idCheck(givenDishId) {
    if (givenDishId === 'new' || givenDishId === undefined) {
      givenDishId = cuid();
      const current = JSON.parse(this.localStorageService.getItem('dishList'));
      this.dishesList$.next([...current, { dishId: givenDishId, dishType: [], products: [], name: '', steps: [], tags: [] }]);
      this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
      this.myRouter.navigate(['../recipe/', givenDishId], { state: { edit: true, reset: true } });
    }
    return givenDishId;
  }


// nie użyte
//   add(event): void {
//     const current = JSON.parse(this.localStorageService.getItem('dishList'));
//     this.dishesList$.next(
//       [
//         ...current,
//         {
//           hashId: cuid(),
//           name: event
//         }]);
//     this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
//   }
}
