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

  add(newTag: string): void {
    let duplicat = false;
    const value = newTag.trim();
    if (value) {
      this.tags$.value.forEach(allergen => {
        if (allergen.name === newTag) {
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
              name: newTag
            }]);

        // console.table('TO TO', this.tags$.value);
        this.localStorageService.setItem('hashes', JSON.stringify(this.tags$.value));
        // if (!this.ALLtags$.includes(value)) {
        // this.tags$.next([{ hashId: cuid(), name: newTag.value }]);
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
