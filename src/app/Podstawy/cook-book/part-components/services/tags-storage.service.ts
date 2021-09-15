import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Hash } from '../../types';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class TagsStorageService {
  tags$ = new BehaviorSubject<Array<Hash>>([]);

  constructor(private localStorageService: LocalStorageService) {

    if (!!localStorage.hashes) {
      const current = JSON.parse(this.localStorageService.getItem('hashes'));
      this.tags$.next([...current]);
    } else {
      this.tags$.next([
        { hashId: cuid(), name: '#Szpinakowe' },
        { hashId: cuid(), name: '#Pieczarkistyczne' },
        { hashId: 'fff', name: '#Mięsne mniam' }
      ]);
      this.localStorageService.setItem('hashes', JSON.stringify(this.tags$.value));
    }
  }

  add(event): void {
    let duplicat = false;
    const value = event.trim();
    if (value) {
      this.tags$.value.forEach(allergen => {
        if (allergen.name === event) {
          duplicat = true;
        }
      });
      if (!duplicat) {
        const current = JSON.parse(this.localStorageService.getItem('hashes'));
        this.tags$.next(
          [
            ...current,
            {
              hashId: cuid(),
              name: event
            }]);

        // console.table('TO TO', this.tags$.value);
        this.localStorageService.setItem('hashes', JSON.stringify(this.tags$.value));
        // if (!this.ALLtags$.includes(value)) {
        // this.tags$.next([{ hashId: cuid(), name: event.value }]);
        //     }
      }
    }
  }

  remove(hashId: number) {
    const current = this.tags$.value;
    console.table(current);
    const deleto = this.tags$.value[hashId].hashId;
    this.tags$.next(
      [
        ...current.filter(record => record.hashId !== deleto)
      ]
    );
    this.localStorageService.removeItem('hashes');
    this.localStorageService.setItem('hashes', JSON.stringify(this.tags$.value));
  }
}
