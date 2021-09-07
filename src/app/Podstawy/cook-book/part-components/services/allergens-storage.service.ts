import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Allergen } from '../../types';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AllergensStorageService {
  allergens$ = new BehaviorSubject<Array<Allergen>>([]);

  constructor(private localStorageService: LocalStorageService) {
    if (!!localStorage.allergens) {
    } else {
      this.allergens$.next([
        { allergenId: cuid(), name: 'Laktoza' },
        { allergenId: cuid(), name: 'Białko' },
        { allergenId: cuid(), name: 'Gluten' }
      ]);
    }
  }

  add(event): void {
    // console.log('Próba dodania');
    const value = event.trim();
    // console.log('event: ', event);
    if (value) {
      if (this.allergens$.getValue().findIndex(hash => hash.name === value) !== -1) {
        this.allergens$.next([{ allergenId: cuid(), name: event }]);
        // console.log('powtorka');
      }

      const current = JSON.parse(this.localStorageService.getItem('hashes'));
      this.allergens$.next(
        [
          ...current,
          {
            hashId: cuid(),
            name: event
          }]);

      // console.table('TO TO', this.tags$.value);
      this.localStorageService.setItem('hashes', JSON.stringify(this.allergens$.value));
      // if (!this.ALLtags$.includes(value)) {
      // this.tags$.next([{ hashId: cuid(), name: event.value }]);
      //     }
    }
  }
}
