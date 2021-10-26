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
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class DishStorageService {
  editionInProgress$ = new BehaviorSubject<boolean>(false);
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

  constructor(
    private tagsService: TagsStorageService,
    private localStorageService: LocalStorageService,
    public myRouter: Router,
    private addRecipeComponent: AddRecipeComponent
  ) {

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
    const checkedDishId = this.idCheck(givenDishId);
    this.dishesListCopied$.next({
      dishId: checkedDishId,
      ...this.dishesListCopied$.value,
      products: this.dishesListCopied$.value.dishId === checkedDishId
        ? [...this.dishesListCopied$.value.products, { usedProductId: addedProduct.usedProductId }]
        : this.dishesListCopied$.value.products
    });
    this.dishesListCopied$.pipe(first()).subscribe(value => console.log('EditedDish', value));
  }

  newStep(newStep: string, givenDishId: string) {
    const checkedDishId = this.idCheck(givenDishId);
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === checkedDishId
        ? [...this.dishesListCopied$.value.steps, newStep] :
        this.dishesListCopied$.value.steps
    });
  }

  deleteStep(index: number, givenDishId: string) {
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.dishesListCopied$.value.steps.filter((value1, index1) => index1 !== index)
        : this.dishesListCopied$.value.steps
    });
  }

  editStep(editedStep: { step: string, index: number }, givenDishId) {
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.dishesListCopied$.value.steps.map((value1, index1) => (index1 === editedStep.index) ? editedStep.step : value1)
        : this.dishesListCopied$.value.steps
    });
  }

  reindexStep(reindex: { previousIndex: number, currentIndex: number }, givenDishId) {
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.reindex(this.dishesListCopied$.value.steps, reindex.previousIndex, reindex.currentIndex)
        : this.dishesListCopied$.value.steps

    });
  }

  reindex(steps, previousIndex, currentIndex) {
    moveItemInArray(steps, previousIndex, currentIndex);
    return steps;
  }

  nameChange(newName: string, givenDishId: string) {
    givenDishId = this.idCheck(givenDishId);
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      name: this.dishesListCopied$.value.dishId === givenDishId ? newName : this.dishesListCopied$.value.name
    });
  }

  typeChange(types: Array<{ dishId: string }>, givenDishId: string) {
    const checkedDishId = this.idCheck(givenDishId);
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      dishType: this.dishesListCopied$.value.dishId === checkedDishId ? types : this.dishesListCopied$.value.dishType
    });
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
        this.addRecipeComponent.recipe2$.subscribe(value =>
          this.dishesListCopied$.next(
            value
          ));

      }
    }

    let x;
    this.dishesList$.subscribe(value => {
      x = value.filter(({ dishId }) =>
        dishId === givenDishId
      )[0];
    });
    stringify(x);
    let y;
    this.editionInProgress$.subscribe(value => y = value);
    stringify(y);
    console.log('x');
    console.log(x);
    console.log('y');
    console.log(y);
    console.log('x === y');
    console.log(x === y);


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

  endEdition() {
    //dwa takie same produkty
    this.dishesList$.next([...this.dishesList$.value, { ...this.dishesListCopied$.value }]);
    this.editState = false;
    console.log('Zakończono edycję');
  }

}
