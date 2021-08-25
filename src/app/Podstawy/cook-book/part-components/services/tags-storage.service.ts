import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Hashes } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class TagsStorageService {
  hashes$ = new BehaviorSubject<Array<Hashes>>([]);

  constructor() {



    if (!!localStorage.hashes) {
    } else {
      this.hashes$.next([
        { hashId: cuid(), name: 'Szpinak' }
      ]);
    }
  }
}
