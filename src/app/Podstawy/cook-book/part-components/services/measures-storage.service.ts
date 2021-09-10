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
        { measureId: cuid(), measure: 'litr', shortcut: 'l' },
        { measureId: cuid(), measure: 'mililitry', shortcut: 'ml' },
        { measureId: cuid(), measure: 'gram', shortcut: 'g' },
        { measureId: cuid(), measure: 'kilogram', shortcut: 'kg' },
        { measureId: cuid(), measure: 'szklanka', shortcut: 'szkl.' },
        { measureId: cuid(), measure: 'sztuki', shortcut: 'szt.' }
      ]);
    }


  }
}
