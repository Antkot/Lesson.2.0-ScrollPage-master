import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Hashes } from '../../types';
import { MatChipInputEvent } from '@angular/material/chips';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class TagsStorageService {
  tags$ = new BehaviorSubject<Array<Hashes>>([]);

  constructor(private localStorageService: LocalStorageService) {

    if (!!localStorage.hashes) {
      const current = JSON.parse(this.localStorageService.getItem('hashes'));
      this.tags$.next([...current]);
    } else {
      const current2 = this.tags$.value;
      this.tags$.next([
        { hashId: cuid(), name: 'Szpinak' },
        { hashId: cuid(), name: 'Pieczarki' },
        { hashId: cuid(), name: 'Mięsne' }
      ]);
      this.localStorageService.setItem('hashes', JSON.stringify(this.tags$.value));
    }
  }

  add(event): void {
    console.log('Próba dodania');
    const value = event.trim();
    console.log('event: ', event);
    if (value) {
      if (this.tags$.getValue().findIndex(hash => hash.name === value) !== -1) {
        this.tags$.next([{ hashId: cuid(), name: event }]);
        console.log('powtorka');
      }

      const current = JSON.parse(this.localStorageService.getItem('hashes'));
      this.tags$.next(
        [
          ...current,
          {
            hashId: cuid(),
            name: event
          }]);

      console.table('TO TO', this.tags$.value);
      this.localStorageService.setItem('hashes', JSON.stringify(this.tags$.value));
      // if (!this.ALLtags$.includes(value)) {
      // this.tags$.next([{ hashId: cuid(), name: event.value }]);
      //     }
    }
  }

}
