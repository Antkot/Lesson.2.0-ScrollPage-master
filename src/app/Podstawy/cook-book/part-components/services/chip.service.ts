import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ChipService {

  constructor() {
  }

  addTag(x: string) {
    return x;
  }

}
