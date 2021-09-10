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
        { productId: cuid(), measure: 'litr', shortcut: 'l' },
        { productId: cuid(), measure: 'mililitry', shortcut: 'ml' },
        { productId: cuid(), measure: 'gram', shortcut: 'g' },
        { productId: cuid(), measure: 'kilogram', shortcut: 'kg' },
        { productId: cuid(), measure: 'szklanka', shortcut: 'szkl.' },
        { productId: cuid(), measure: 'sztuki', shortcut: 'szt.' }
      ]);
    }


  }
}
