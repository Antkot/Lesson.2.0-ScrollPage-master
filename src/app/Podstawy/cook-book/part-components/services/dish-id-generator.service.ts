import { Injectable } from '@angular/core';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class DishIdGeneratorService {

  constructor() {
  }

  generateId() {

    return cuid();
  }
}
