import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, Hash, UsedProduct } from '../../types';
import { TagsStorageService } from './tags-storage.service';
import { LocalStorageService } from './local-storage-service';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { number } from '@storybook/addon-knobs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class DishStorageService {
  dishesList$ = new BehaviorSubject<Array<Dish>>([]);
  dishesListCopied$ = new BehaviorSubject<Dish>({
    dishId: '',
    name: '',
    tags: [],
    steps: [],
    products: [],
    dishType: []
  });
  editState = false;

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

    // this.dishesListCopied$.next(
    //   {
    //     dishId: cuid(),
    //     name: 'Pierogi ze storage',
    //     steps: ['1', '2 krok', 'ugotuj'],
    //     products: [{ usedProductId: 'used1' }, { usedProductId: 'used2' }],
    //     tags: [{ hashId: 'fff' }],
    //     dishType: [{ dishId: '1' }]
    //   }
    // );
  }

  // this.dishesList$.next({...this.dishesListCopied$.value, ...dishesListCopied$});


  addProduct(addedProduct: UsedProduct, givenDishId: string) {
    givenDishId = this.idCheck(givenDishId);
    this.dishesListCopied$.next({
      dishId: givenDishId,
      name: this.dishesListCopied$.value.name,
      steps: this.dishesListCopied$.value.steps,
      products: this.dishesListCopied$.value.dishId === givenDishId
        ? [...this.dishesListCopied$.value.products, { usedProductId: addedProduct.usedProductId }]
        : this.dishesListCopied$.value.products,
      tags: this.dishesListCopied$.value.tags,
      dishType: this.dishesListCopied$.value.dishType
    });
    this.dishesListCopied$.pipe(first()).subscribe(value => console.log('EditedDish', value));
  }

  // addProduct(addedProduct: UsedProduct, givenDishId: string) {
  //   givenDishId = this.idCheck(givenDishId);
  //   this.dishesList$.pipe(first()).subscribe(value => console.log('DISH1', value));
  //   const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
  //   this.dishesList$.next(current.map(({ products, ...value }) => ({
  //     ...value,
  //     products: value.dishId === givenDishId ? [...products, { usedProductId: addedProduct.usedProductId }] : products
  //   })));
  //   this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  //   this.dishesList$.pipe(first()).subscribe(value => console.log('DISH2', value));
  // }

  newStep(newStep: string, givenDishId: string) {
    const checkedDishId = this.idCheck(givenDishId);
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ steps, ...value }) => ({
      ...value,
      steps: value.dishId === checkedDishId ? [...steps, newStep] : steps
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  deleteStep(index: number, givenDishId: string) {
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ steps, ...value }) => ({
      ...value,
      steps: value.dishId === givenDishId ? steps.filter((value1, index1) => index1 !== index) : steps
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  editStep(editedStep: { step: string, index: number }, givenDishId) {
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ steps, ...value }) => ({
      ...value,
      steps: value.dishId === givenDishId ? steps.map((value1, index1) => (index1 === editedStep.index) ? editedStep.step : value1) : steps
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  reindexStep(reindex: { previousIndex: number, currentIndex: number }, givenDishId) {
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ steps, ...value }) => ({
      ...value,
      steps: value.dishId === givenDishId ? this.reindex(steps, reindex.previousIndex, reindex.currentIndex) : steps
      // steps: value.dishId === givenDishId ? moveItemInArray(steps, reindex.previousIndex, reindex.currentIndex) : steps
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  // steps.map(() => moveItemInArray(steps, reindex.previousIndex, reindex.currentIndex))
  reindex(steps, previousIndex, currentIndex) {
    moveItemInArray(steps, previousIndex, currentIndex);
    return steps;
  }

  nameChange(newName: string, givenDishId: string) {
    givenDishId = this.idCheck(givenDishId);
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ name, ...value }) => ({
      ...value,
      name: value.dishId === givenDishId ? newName : name
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  typeChange(types: Array<{ dishId: string }>, givenDishId: string) {

    // console.log('serviced types');
    // console.log(types);

    const checkedDishId = this.idCheck(givenDishId);
    console.log(333333333333, checkedDishId);
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(current.map(({ dishType, ...value }) => ({
      ...value,
      dishType: value.dishId === checkedDishId ? types : dishType
    })));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));

    this.dishesList$.pipe(first()).subscribe(value => console.log('typ zmieniony: ', value));
  }

  idCheck(givenDishId: string) {
    if (givenDishId === 'new' || givenDishId === undefined) {
      console.log(44444444444444);
      givenDishId = cuid();
      if (this.editState === false) {
        this.editState = true;
      }
      const current = JSON.parse(this.localStorageService.getItem('dishList'));
      this.myRouter.navigate(['../recipe/', givenDishId], { state: { edit: true, reset: true } });
      this.dishesList$.next([...current, { dishId: givenDishId, dishType: [], products: [], name: '', steps: [], tags: [] }]);
      this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
    } else {
      if (this.editState === false) {
        this.editState = true;
        this.dishesList$.subscribe(value => {
          this.dishesListCopied$.next(
            value.filter(({ dishId }) =>
              dishId === givenDishId
            )[0]);
        });
      }
    }


    return givenDishId;
  }

  deleteDish(dishId: string) {
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(
      [
        ...current.filter(record => record.dishId !== dishId)
      ]
    );
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
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
  endEdition() {
    // merge dishesList$ i dishesListCopied$
    this.editState = false;
    console.log('Zakończono edycję');
  }

}
