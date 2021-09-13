import { Component, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { Hashes, Products } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
constructor() {
}
  @Input() edit;
  @Input() products: Array<Products>;

  ngOnInit(): void {
    console.log(this.products);
  }
}
