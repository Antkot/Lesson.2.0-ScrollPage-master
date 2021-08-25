import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Measures } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class MeasuresStorageService {
  measures$ = new BehaviorSubject<Array<Measures>>([]);

  constructor() {

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


  }
}
