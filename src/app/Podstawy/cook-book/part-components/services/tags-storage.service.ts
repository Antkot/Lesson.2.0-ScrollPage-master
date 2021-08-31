import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { BehaviorSubject } from 'rxjs';
import { Hashes } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class TagsStorageService {
  tags$ = new BehaviorSubject<Array<Hashes>>([]);

  constructor() {



    if (!!localStorage.hashes) {
    } else {
      this.tags$.next([
        { hashId: cuid(), name: 'Szpinak' }
      ]);
    }
  }
}
