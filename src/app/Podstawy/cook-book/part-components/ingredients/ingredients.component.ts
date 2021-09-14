import { Component, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { Hashes, Products } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';
import { TagsStorageService } from '../services/tags-storage.service';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  products$: Observable<Array<Products>> = this.productsService.products$;

  constructor(private productsService: ProductsStorageService) {
  }


  @Input() edit;
  @Input() products: Array<Products>;

}
