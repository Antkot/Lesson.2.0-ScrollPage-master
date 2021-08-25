import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Levels, } from '../../types';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  levels$ = new BehaviorSubject<Array<Levels>>([]);

  constructor() {
    if (!!localStorage.levelData) {
    } else {
      this.levels$.next([
        { levelId: cuid(), level: 1 },
        { levelId: cuid(), level: 2 },
        { levelId: cuid(), level: 3 },
        { levelId: cuid(), level: 4 },
        { levelId: cuid(), level: 5 }
      ]);
    }


  }
}
