import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Allergen, Dish, Hashes, Levels, Measures, Products, Timer } from '../../types';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  dishes$ = new BehaviorSubject<Array<Dish>>([]);
  levels$ = new BehaviorSubject<Array<Levels>>([]);
  allergens$ = new BehaviorSubject<Array<Allergen>>([]);
  hashes$ = new BehaviorSubject<Array<Hashes>>([]);
  measures$ = new BehaviorSubject<Array<Measures>>([]);
  products$ = new BehaviorSubject<Array<Products>>([]);

  constructor() {
    if (!!localStorage.levelData) {
    } else {
      this.levels$.next([
        { levelId: cuid(), level: 1 },
        { levelId: cuid(), level: 2 },
        { levelId: cuid(), level: 3 },
        { levelId: cuid(), level: 4 },
        { levelId: cuid(), level: 5 }
      ]);
    }
    if (!!localStorage.allergens) {
    } else {
      this.allergens$.next([
        { allergenId: cuid(), name: 'Laktoza' },
        { allergenId: cuid(), name: 'Białko' },
        { allergenId: cuid(), name: 'Gluten' }
      ]);
    }
    if (!!localStorage.hashes) {
    } else {
      this.hashes$.next([
        { hashId: cuid(), name: 'Szpinak' }
      ]);
    }
    if (!!localStorage.measures) {
    } else {
      this.measures$.next([
        { nameId: cuid(), measure: 'litr', shortcut: 'l' },
        { nameId: cuid(), measure: 'mililitry', shortcut: 'ml' },
        { nameId: cuid(), measure: 'gram', shortcut: 'g' },
        { nameId: cuid(), measure: 'kilogram', shortcut: 'kg' },
        { nameId: cuid(), measure: 'szklanka', shortcut: 'szkl.' },
        { nameId: cuid(), measure: 'sztuki', shortcut: 'szt.' }
      ]);
    }
    if (!!localStorage.products) {
    } else {
      this.products$.next([
        { nameId: cuid(), product: 'Mleko', allergens: ['Laktoza'] },
        { nameId: cuid(), product: 'Woda', allergens: null },
        { nameId: cuid(), product: 'Drożdze', allergens: null },
        { nameId: cuid(), product: 'Mąka', allergens: null },
        { nameId: cuid(), product: 'Cukier', allergens: null },
        { nameId: cuid(), product: 'Jaja', allergens: ['Laktoza', 'Białko'] }
      ]);
    }
  }
}
