import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { DishStorageService } from '../../part-components/services/dish-storage.service';
import { UsedProductsStorageService } from '../../part-components/services/used-products-storage.service';
import { ProductsStorageService } from '../../part-components/services/products-storage.service';

@Component({
  selector: 'app-recipie-page',
  templateUrl: './recipie-page.component.html',
  styleUrls: ['./recipie-page.component.scss']
})
export class RecipiePageComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    private productService: ProductsStorageService,
    private dishService: DishStorageService,
    private usedProductService: UsedProductsStorageService,
    private route: ActivatedRoute) {
  }

  edit$: Observable<boolean> = combineLatest([this.activatedRoute.paramMap
    .pipe(map(() => window.history.state))]).pipe(map(([{ edit }]) => {
    console.log('Edycja', edit);
    return edit;
  }));
  dishId$: Observable<string> = combineLatest([this.route.url.pipe(
    map(value => value[1].path))]).pipe(map(([dishId]) => {
    console.log('Id posiłku', dishId);
    return dishId;
  }));
  reset$: Observable<boolean> = combineLatest([this.activatedRoute.paramMap
    .pipe(map(() => window.history.state))]).pipe(map(([{ reset }]) => {
    console.log('Reset', reset);
    return reset;
  }));

  ngOnInit(): void {
  }
  nameEdited(event) {
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.nameChange(event, dishId)
    );
  }

  addUsedProduct(event) {
    const newProd = this.usedProductService.addProduct(event);
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.addProduct(newProd, dishId)
    );
  }

  addProduct(event) {
    this.productService.addProduct(event);
  }

  stepEdit(event) {
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.stepChange(event, dishId)
    );
  }

}
