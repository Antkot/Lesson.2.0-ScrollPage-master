import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Measure } from '../../types';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class MeasuresStorageService {
  measures$ = new BehaviorSubject<Array<Measure>>([]);

  constructor(private localStorageService: LocalStorageService) {

    if (!!localStorage.measures) {
      const current = JSON.parse(this.localStorageService.getItem('measures'));
      this.measures$.next([...current]);
    } else {
      this.measures$.next([
        { measureId: 'cuuu', name: 'litr', shortcut: 'l' },
        { measureId: cuid(), name: 'mililitry', shortcut: 'ml' },
        { measureId: cuid(), name: 'gram', shortcut: 'g' },
        { measureId: cuid(), name: 'kilogram', shortcut: 'kg' },
        { measureId: cuid(), name: 'szklanka', shortcut: 'szkl.' },
        { measureId: cuid(), name: 'sztuki', shortcut: 'szt.' }
      ]);
      this.localStorageService.setItem('measures', JSON.stringify(this.measures$.value));
    }


  }
}
