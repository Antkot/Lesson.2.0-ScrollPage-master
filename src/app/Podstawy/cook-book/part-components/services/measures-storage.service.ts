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
        { measureId: 'cuuu', name: 'litr', shortcut: 'l' },
        { measureId: cuid(), name: 'mililitry', shortcut: 'ml' },
        { measureId: cuid(), name: 'gram', shortcut: 'g' },
        { measureId: cuid(), name: 'kilogram', shortcut: 'kg' },
        { measureId: cuid(), name: 'szklanka', shortcut: 'szkl.' },
        { measureId: cuid(), name: 'sztuki', shortcut: 'szt.' }
      ]);
    }


  }
}
