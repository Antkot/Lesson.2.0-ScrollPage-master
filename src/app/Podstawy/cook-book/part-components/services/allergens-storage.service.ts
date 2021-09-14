import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Hashes } from '../../types';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AllergensStorageService {
  allergens$ = new BehaviorSubject<Array<Hashes>>([]);

  constructor(private localStorageService: LocalStorageService) {
    if (!!localStorage.allergens) {
      const current = JSON.parse(this.localStorageService.getItem('allergens'));
      this.allergens$.next([...current]);
    } else {
      this.allergens$.next([
        { hashId: cuid(), name: 'Laktoza' },
        { hashId: cuid(), name: 'Białko' },
        { hashId: cuid(), name: 'Gluten' }
      ]);
      this.localStorageService.setItem('allergens', JSON.stringify(this.allergens$.value));
    }
  }

  add(event): void {
    let duplicat = false;
    const value = event.trim();
    if (value) {
      this.allergens$.value.forEach(allergen => {
        if (allergen.name === event) {
          duplicat = true;
        }
      });
      if (!duplicat) {
        if (this.allergens$.getValue().findIndex(hash => hash.name === value) !== -1) {
          this.allergens$.next([{ hashId: cuid(), name: event }]);
        }
        const current = JSON.parse(this.localStorageService.getItem('allergens'));
        this.allergens$.next(
          [
            ...current,
            {
              hashId: cuid(),
              name: event
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
