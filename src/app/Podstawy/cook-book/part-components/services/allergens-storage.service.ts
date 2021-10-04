import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Hash } from '../../types';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AllergensStorageService {
  allergens$ = new BehaviorSubject<Array<Hash>>([]);

  constructor(private localStorageService: LocalStorageService) {
    if (!!localStorage.allergens) {
      const current = JSON.parse(this.localStorageService.getItem('allergens'));
      this.allergens$.next([...current]);
    } else {
      this.allergens$.next([
        { hashId: cuid(), name: 'Siarczyny' },
        { hashId: cuid(), name: 'Jajka' },
        { hashId: cuid(), name: 'Łubin' },
        { hashId: cuid(), name: 'Mięczaki' },
        { hashId: cuid(), name: 'Mleko' },
        { hashId: cuid(), name: 'Musztarda' },
        { hashId: cuid(), name: 'Orzechy' },
        { hashId: cuid(), name: 'Orzechy ziemne' },
        { hashId: cuid(), name: 'Ryby' },
        { hashId: cuid(), name: 'Seler' },
        { hashId: cuid(), name: 'Skorupiaki' },
        { hashId: cuid(), name: 'Soja' },
        { hashId: cuid(), name: 'Sezam' },
        { hashId: cuid(), name: 'Gluten' }
      ]);
      this.localStorageService.setItem('allergens', JSON.stringify(this.allergens$.value));
    }
  }

  add(newAllergen): void {
    let duplicat = false;
    const value = newAllergen.trim();
    if (value) {
      this.allergens$.value.forEach(allergen => {
        if (allergen.name === newAllergen) {
          duplicat = true;
        }
      });
      if (!duplicat) {
        if (this.allergens$.getValue().findIndex(hash => hash.name === value) !== -1) {
          this.allergens$.next([{ hashId: cuid(), name: newAllergen }]);
        }
        const current = JSON.parse(this.localStorageService.getItem('allergens'));
        this.allergens$.next(
          [
            ...current,
            {
              hashId: cuid(),
              name: newAllergen
            }]);
        this.localStorageService.setItem('allergens', JSON.stringify(this.allergens$.value));
        //     }
      }
    }
  }

  remove(hashId: number) {
    const current = this.allergens$.value;
    console.table(current);
    const deleto = this.allergens$.value[hashId].hashId;
    this.allergens$.next(
      [
        ...current.filter(record => record.hashId !== deleto)
      ]
    );
    this.localStorageService.removeItem('allergens');
    this.localStorageService.setItem('allergens', JSON.stringify(this.allergens$.value));
  }

}
