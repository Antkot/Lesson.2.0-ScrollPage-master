import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, Hash, UsedProduct } from '../../types';
import { TagsStorageService } from './tags-storage.service';
import { LocalStorageService } from './local-storage-service';
import { find, first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { number } from '@storybook/addon-knobs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { stringify } from 'querystring';
import { after, indexOf } from 'lodash';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DishStorageService {
  edition$ = this.loadingService.edition$;
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
  empty = {
    dishId: '',
    name: '',
    tags: [],
    steps: [],
    products: [],
    dishType: []
  };

  constructor(
    private loadingService: LoadingService,
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
        this.editCheckStorage(url);
        // this.dishesListCopied$.next({
        //   dishId: url,
        //   name: '',
        //   tags: [],
        //   steps: [],
        //   products: [],
        //   dishType: []
        // });
      }
    });
  }


  addProduct(addedProduct: UsedProduct, givenDishId: string) {
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      dishId: givenDishId,
      products: this.dishesListCopied$.value.dishId === givenDishId
        ? [...this.dishesListCopied$.value.products, { usedProductId: addedProduct.usedProductId }]
        : this.dishesListCopied$.value.products
    });
    this.editCheck(givenDishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
  }
  deleteProduct(deletedProductId: string, dishId: string) {
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      dishId,
      products: this.dishesListCopied$.value.dishId === dishId
        ? [...this.dishesListCopied$.value.products.filter((usedId) => usedId[0] !== deletedProductId)]
        : this.dishesListCopied$.value.products
    });
    this.editCheck(dishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
  }

  newStep(newStep: string, givenDishId: string) {
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? [...this.dishesListCopied$.value.steps, newStep]
        : this.dishesListCopied$.value.steps,
      dishId: givenDishId
    });
    this.editCheck(givenDishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
  }

  deleteStep(deletedStepIndex: number, givenDishId: string) {
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.dishesListCopied$.value.steps.filter((value, index) => index !== deletedStepIndex)
        : this.dishesListCopied$.value.steps
    });
    this.editCheck(givenDishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
  }

  editStep(editedStep: { step: string, index: number }, givenDishId) {
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.dishesListCopied$.value.steps.map((value1, index1) => (index1 === editedStep.index) ? editedStep.step : value1)
        : this.dishesListCopied$.value.steps
    });
    this.editCheck(givenDishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
  }

  reindexStep(reindex: { previousIndex: number, currentIndex: number }, givenDishId) {
    this.dishesListCopied$.next({
      dishId: givenDishId,
      ...this.dishesListCopied$.value,
      steps: this.dishesListCopied$.value.dishId === givenDishId
        ? this.reindex(this.dishesListCopied$.value.steps, reindex.previousIndex, reindex.currentIndex)
        : this.dishesListCopied$.value.steps
    });
    this.editCheck(givenDishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
  }

  reindex(array, previousIndex, currentIndex) {
    moveItemInArray(array, previousIndex, currentIndex);
    return array;
  }

  nameChange(newName: string, givenDishId: string) {
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      dishId: givenDishId,
      name: this.dishesListCopied$.value.dishId === givenDishId ? newName : this.dishesListCopied$.value.name
    });
    this.editCheck(givenDishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
  }

  typeChange(types: Array<{ dishId: string }>, givenDishId: string) {
    console.log('typeChange');
    this.dishesListCopied$.next({
      ...this.dishesListCopied$.value,
      dishId: givenDishId,
      dishType: this.dishesListCopied$.value.dishId === givenDishId ? types : this.dishesListCopied$.value.dishType
    });
    this.editCheck(givenDishId);
    this.localStorageService.setItem('editedDish', JSON.stringify(this.dishesListCopied$.value));
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

  deleteDish(givenDishId: string) {
    const current: Array<Dish> = JSON.parse(this.localStorageService.getItem('dishList'));
    this.dishesList$.next(
      [
        ...current.filter(({ dishId }) => dishId !== givenDishId)
      ]
    );
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  endEdition(givenDishId: string) {
    let indexOfDish: number;
    let indexOfLastDish: number;
    console.log('endEdition');
    if (!this.dishesList$.subscribe(value => {
      value.filter(({ dishId }) =>
        dishId === givenDishId
      );
    })) {
      this.dishesList$.next([...this.dishesList$.value, { ...this.dishesListCopied$.value }]);
    } else {
      this.dishesList$.pipe(first()).subscribe(( dish ) => {
        indexOfDish =  dish.findIndex(({ dishId }) =>
          dishId === givenDishId);
      });
    }
    this.dishesList$.next([...this.dishesList$.value.filter(value => value.dishId !== givenDishId), { ...this.dishesListCopied$.value }]);
    this.editState = false;
    this.dishesList$.pipe(first()).subscribe(( dish ) => {
      indexOfLastDish =  dish.findIndex(({ dishId }) =>
        dishId === givenDishId);
    });
    this.reindex(this.dishesList$.value, indexOfLastDish, indexOfDish);
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
    console.log('Zakończono edycję');
  }

  editCheck(givenDishId) {
    this.empty.dishId = givenDishId;
    console.log('Edit Check');
    // !!! SIMPLIFY
    let beforeEdition;
    this.dishesList$.pipe(first()).subscribe(value => {
      beforeEdition = value.filter(({ dishId }) =>
        dishId === givenDishId,

      )[0];
    });
    let afterEdition;
    this.dishesListCopied$.subscribe(value => afterEdition = value);
    console.log(1111);
    console.table(stringify(afterEdition));
    console.table(stringify(this.empty));
    console.log(afterEdition === this.empty);
    this.editionInProgress$.next((stringify(afterEdition) !== stringify(beforeEdition))
      && (stringify(afterEdition) !== stringify(this.empty)));
    this.editionInProgress$.pipe(first()).subscribe(value => console.log('Edycja trwa: ', value));
    this.localStorageService.setItem('dishList', JSON.stringify(this.dishesList$.value));
  }

  editCheckStorage(id) {
    console.log(id);
    const editedDishStoraged = JSON.parse(this.localStorageService.getItem('editedDish'));
    if (id === editedDishStoraged.dishId) {
      console.log('Jest zapis tego dania');
      console.log('current:');
      console.table(editedDishStoraged);
      this.dishesListCopied$.next({
        ...editedDishStoraged
      });
      this.edition$.next(true);
      console.log('edit trwać ma teraz;');
    } else {
      this.erase();
    }
    console.log('editCheckStorage zakończono');
  }

}
