import { Component, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { Hashes, Measures, Products } from '../../types';
import { ProductsStorageService } from '../services/products-storage.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { MeasuresTranslatorPipe } from '../../pipes/measures-translator.pipe';


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent {
  products$: Observable<Array<Products>> = this.productsService.products$;
  measures$: Observable<Array<Measures>> = this.measureService.measures$;

  constructor(private productsService: ProductsStorageService, private measureService: MeasuresStorageService) {
  }


  @Input() edit;
  @Input() products: Array<Products>;

}
