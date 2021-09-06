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
      this.tags$.next(
        [{
          hashId: current.hashId,
          name: current.name
        }]);
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

  add(event: MatChipInputEvent): void {
    console.log('Próba dodania');
    const value = (event.value || '').trim();
    console.log(value);
    if (value) {
      if (this.tags$.getValue().findIndex(hash => hash.name === value) !== -1) {
        this.tags$.next([{ hashId: cuid(), name: event.value }]);
      }
      console.table('TO TO', this.tags$.value);
      this.localStorageService.setItem('hashes', JSON.stringify(this.tags$.value));
      // if (!this.ALLtags$.includes(value)) {
      // this.tags$.next([{ hashId: cuid(), name: event.value }]);
      //     }
    } else {
      console.log('Nie spełniono warunków');
    }
  }

}
