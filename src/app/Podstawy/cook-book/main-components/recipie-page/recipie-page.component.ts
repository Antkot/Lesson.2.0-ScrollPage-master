import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { DishStorageService } from '../../part-components/services/dish-storage.service';
import { UsedProductsStorageService } from '../../part-components/services/used-products-storage.service';
import { ProductsStorageService } from '../../part-components/services/products-storage.service';
import { number } from '@storybook/addon-knobs';
import { AddedProductType, AddedUsedProductType, BothIdType } from '../../types';

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
    .pipe(map(() => history.state))]).pipe(map(([{ edit }]) => edit));
  dishId$: Observable<string> = combineLatest([this.route.url.pipe(
    map(value => value[1].path))]).pipe(map(([dishId]) => {
    console.log('Id posiłku', dishId);
    return dishId;
  }));
  reset$: Observable<boolean> = combineLatest([this.activatedRoute.paramMap
    .pipe(map(() => history.state))]).pipe(map(([{ reset }]) => {
    console.log('Reset', reset);
    return reset;
  }));

  ngOnInit(): void {
  }

  nameEdited(newName: string) {
    console.log('nazwa zmieniona');
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.nameChange(newName, dishId)
    );
  }

  addUsedProduct(newUsedProduct: AddedUsedProductType) {
    const newProd = this.usedProductService.addProduct(newUsedProduct);
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.addProduct(newProd, dishId)
    );
  }

  addProduct(newProduct: AddedProductType) {
    this.productService.addProduct(newProduct);
  }

  newStepEmitter(newStep: string) {
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.newStep(newStep, dishId)
    );
  }
  deletedStepEmitter(index: number) {
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.deleteStep(index, dishId)
    );
  }
  editStepEmitter(editedStep: {step: string, index: number}) {
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.editStep(editedStep, dishId)
    );
  }
  reindexStepEmitter(reindex: {previousIndex: number, currentIndex: number }) {
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.reindexStep(reindex, dishId)
    );
  }


  typeEdition(dishType: Array<{ dishId: string }>) {
    this.dishId$.pipe(first()).subscribe((dishId) =>
      this.dishService.typeChange(dishType, dishId)
    );
  }

  deleteProdMeasure(bothId: BothIdType) {
    this.productService.deleteProdMeasure(bothId);
  }
  endEdition() {
    this.dishService.endEdition();
  }
}
