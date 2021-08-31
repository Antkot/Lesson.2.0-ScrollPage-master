import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Hashes } from '../../types';
import { MatChipInputEvent } from '@angular/material/chips';

@Injectable({
  providedIn: 'root'
})
export class TagsStorageService {
  tags$ = new BehaviorSubject<Array<Hashes>>([]);

  constructor() {


    if (!!localStorage.hashes) {
    } else {
      this.tags$.next([
        { hashId: 'fff', name: 'Szpinak' }
      ]);
    }
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.tags$.getValue().findIndex(hash => hash.name === value) !== -1) {
        this.tags$.next([{ hashId: cuid(), name: event.value }]);
      }
      console.table('TO TO', this.tags$.value);
      // if (!this.ALLtags$.includes(value)) {
      // this.tags$.next([{ hashId: cuid(), name: event.value }]);
      //     }
    }
  }


}
