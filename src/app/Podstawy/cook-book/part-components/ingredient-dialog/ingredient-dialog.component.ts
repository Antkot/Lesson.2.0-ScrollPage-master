import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { Measure, Product } from '../../types';
import { Observable } from 'rxjs';
import { ProductsStorageService } from '../services/products-storage.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  products$: Observable<Array<Product>> = this.productService.products$;
  @Input() name = 'Kuba';
  @Output() button = new EventEmitter();

  constructor(private measureService: MeasuresStorageService, private  productService: ProductsStorageService) { }

  ngOnInit(): void {
  }

}
