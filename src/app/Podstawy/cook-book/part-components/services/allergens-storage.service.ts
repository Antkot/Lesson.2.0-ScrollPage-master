import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Allergen } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class AllergensStorageService {
  allergens$ = new BehaviorSubject<Array<Allergen>>([]);

  constructor() {
    if (!!localStorage.allergens) {
    } else {
      this.allergens$.next([
        { allergenId: cuid(), name: 'Laktoza' },
        { allergenId: cuid(), name: 'Białko' },
        { allergenId: cuid(), name: 'Gluten' }
      ]);
    }
  }

  add(event) {
  }
}
