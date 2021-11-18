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
    private localStorageService: LocalStorageService
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
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotuj', 'ugotuj'],
          products: [{ usedProductId: 'used1' }],
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
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotuj', 'ugotuj'],
          products: [{ usedProductId: 'used1' }],
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
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotuj', 'ugotuj'],
          products: [{ usedProductId: 'used1' }],
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
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotuj', 'ugotuj'],
          products: [{ usedProductId: 'used1' }],
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
        },
        {
          dishId: cuid(),
          name: 'Pierogi z observable',
          steps: ['1', '2 krok', 'ugotuj', 'ugotuj'],
          products: [{ usedProductId: 'used1' }],
          tags: [{ hashId: 'fff' }],
          dishType: [{ dishId: '1' }]
        },
        {
          dishId: cuid(),
          name: 'Pierogi',
          steps: ['Ciasto zmieszaj z mąką', 'Dodaj drożdzy i mleka', 'zalep krztałt pierogów', 'Włóż do piekarnika na 20 minut'],
          products: [{ usedProductId: 'used1' }],
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

  erase() {
    this.dishesListCopied$.next({
      dishId: '',
      name: '',
      tags: [],
      steps: [],
      products: [],
      dishType: []
    });
  }

  newDish(url: string) {
    console.log('newDish');
    this.dishesList$.pipe(first()).subscribe(dishesList => {
      const findDish = dishesList.find(({ dishId }) => dishId === url);
      if (findDish) {
        this.dishesListCopied$.next({ ...findDish });
      } else {
        this.dishesListCopied$.next({
          dishId: '',
          name: '',
          tags: [],
          steps: [],
          products: [],
          dishType: []
        });
      }
    });
  }


  addProduct(addedProduct: UsedProduct, givenDishId: string) {
    console.log('addProduct');
    console.log('givenDishId');
    console.log(givenDishId);
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      dishId: givenDishId,
      products: this.dishesListCopied$.value.dishId === givenDishId
        ? [...this.dishesListCopied$.value.products, { usedProductId: addedProduct.usedProductId }]
        : this.dishesListCopied$.value.products
    });
    this.dishesListCopied$.pipe(first()).subscribe(value => console.log('EditedDish', value));
    this.editCheck(givenDishId);
  }

  newStep(newStep: string, givenDishId: string) {
    console.log('newStep');
    console.log('givenDishId');
    console.log(givenDishId);
    let temporary;
    this.dishesListCopied$.pipe(first()).subscribe(value => temporary = value);
    this.dishesListCopied$.next(temporary.steps.map(({ dishId, steps, ...value }) => ({
      ...value,
      dishId: givenDishId,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? [...this.dishesListCopied$.value.steps, newStep]
        : this.dishesListCopied$.value.steps,
    })));

     // this.products$.next(current.map(({ measures, allergens, ...value }) => ({
    //   ...value,
    //   allergens: value.productId === this.typedProductId ? addedProduct.product.allergens : allergens,
    //   measures: value.productId === this.typedProductId ? [...measures.map(({ measureId, kcal }) => ({
    //       measureId,
    //       kcal: measureId === this.measureId ? addedProduct.product.kcal : kcal
    //     }
    //   ))] : measures
    // })));





    // this.dishesListCopied$.next({
    //   ...this.dishesListCopied$.value,
    //   steps: this.dishesListCopied$.value.dishId === givenDishId
    //     ? [...this.dishesListCopied$.value.steps, newStep]
    //     : this.dishesListCopied$.value.steps,
    //   dishId: givenDishId,
    // });
    this.dishesListCopied$.pipe(first()).subscribe(value => console.log(value));
    this.editCheck(givenDishId);
  }

  deleteStep(index: number, givenDishId: string) {
    console.log('deleteStep');
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.dishesListCopied$.value.steps.filter((value1, index1) => index1 !== index)
        : this.dishesListCopied$.value.steps
    });
    this.editCheck(givenDishId);
  }

  editStep(editedStep: { step: string, index: number }, givenDishId) {
    console.log('editStep');
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.dishesListCopied$.value.steps.map((value1, index1) => (index1 === editedStep.index) ? editedStep.step : value1)
        : this.dishesListCopied$.value.steps
    });
    this.editCheck(givenDishId);
  }

  reindexStep(reindex: { previousIndex: number, currentIndex: number }, givenDishId) {
    console.log('reindexStep');
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.reindex(this.dishesListCopied$.value.steps, reindex.previousIndex, reindex.currentIndex)
        : this.dishesListCopied$.value.steps
    });
    this.editCheck(givenDishId);
  }

  reindex(steps, previousIndex, currentIndex) {
    moveItemInArray(steps, previousIndex, currentIndex);
    return steps;
  }

  nameChange(newName: string, givenDishId: string) {
    console.log('nameChange');
    console.log(newName);
    console.log(givenDishId);
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      dishId: givenDishId,
      name: this.dishesListCopied$.value.dishId === givenDishId ? newName : this.dishesListCopied$.value.name
    });
    this.dishesListCopied$.subscribe(val2ue => console.log(val2ue));
    this.editCheck(givenDishId);
  }

  typeChange(types: Array<{ dishId: string }>, givenDishId: string) {
    console.log('typeChange');
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      dishId: givenDishId,
      dishType: this.dishesListCopied$.value.dishId === givenDishId ? types : this.dishesListCopied$.value.dishType
    });
    this.editCheck(givenDishId);
  }

  // idCheck(givenDishId: string) {
  //   if (givenDishId === 'new' || givenDishId === undefined) {
  //     console.log(44444444444444);
  //     // 3x się wykonuje :v
  //     // co tworzy 3 puste dania
  //     // po kliknięciu dodaj przepis nie znikają dane, więc model mysli że się zmienił i tworzy przepis
  //     givenDishId = cuid();
  //     if (this.editState === false) {
  //       this.editState = true;
  //     }
  //     // const current = JSON.parse(this.localStorageService.getItem('dishList'));
  //     this.myRouter.navigate(['../recipe/', givenDishId], { state: { edit: true, reset: true } });
  //     // this.dishesList$.next([...current, { dishId: givenDishId, dishType: [], products: [], name: '', steps: [], tags: [] }]);
  //     // this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  //   } else {
  //     if (this.editState === false) {
  //       this.editState = true;
  //       // this.addRecipeComponent.recipe2$.subscribe(value =>
  //       //   this.dishesListCopied$.next(
  //       //     value
  //       //   ));
  //     }
  //   }
  //   return givenDishId;
  // }

  deleteDish(dishId: string) {
    console.log('deleteDish');
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(
      [
        ...current.filter(record => record.dishId !== dishId)
      ]
    );
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  endEdition(givenDishId) {
    console.log('endEdition');
    if (!this.dishesList$.subscribe(value => {
      value.filter(({ dishId }) =>
        dishId === givenDishId
      );
      this.dishesListCopied$.subscribe(val2ue => console.table(val2ue));
    })) {
      console.log(1);
      this.dishesList$.next([...this.dishesList$.value, { ...this.dishesListCopied$.value }]);
    } else {
      console.log(2);
      this.dishesList$.next([...this.dishesList$.value.filter(value => value.dishId !== givenDishId), { ...this.dishesListCopied$.value }]);
    }
    this.editState = false;
    this.dishesList$.subscribe(val3ue => console.table(val3ue));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
    console.log('Zakończono edycję');
  }

  editCheck(givenDishId) {
    console.log('Edit Check');
    // !!! SIMPLIFY
    let afterEdition;
    this.dishesList$.subscribe(value => {
      afterEdition = value.filter(({ dishId }) =>
        dishId === givenDishId
      )[0];
    });
    let beforeEdition;
    this.dishesListCopied$.subscribe(value => beforeEdition = value);
    // console.log('x');
    // console.log(afterEdition);
    // console.log('y');
    // console.log(beforeEdition);
    // console.log('x === y');
    // console.log(stringify(afterEdition) === stringify(beforeEdition));
    this.editionInProgress$.next(stringify(afterEdition) !== stringify(beforeEdition));
    this.editionInProgress$.subscribe(value => console.log('Edycja trwa: ', value));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

}
