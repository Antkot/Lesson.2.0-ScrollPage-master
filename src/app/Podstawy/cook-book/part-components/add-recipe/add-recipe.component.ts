import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish, UsedProduct } from '../../types';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { DishStorageService } from '../services/dish-storage.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  @Output() stepsEmitter = new EventEmitter();
  @Output() usedProductToAdd = new EventEmitter();
  @Output() addedProduct = new EventEmitter();
  @Output() nameChange = new EventEmitter();
  @Output() typeChange = new EventEmitter();
  @Input() edit = true;
  @Input() reset = false;
  dishesList$: Observable<Array<Dish>> = this.dishService.dishesList$;
  dishId$ = this.route.url.pipe(
    map(value => value[1].path));
  model = this.fb.group({
    name: ['', [Validators.required]],
    type: [[].length, []]
    // type: [[], [Validators.required]]
  });
  recipe$: Observable<Dish> = combineLatest([this.dishId$, this.dishesList$]).pipe(map(([id, dishesList]) => {
    return dishesList.find(({ dishId }) => dishId === id) ?? {
      dishId: '',
      name: '',
      tags: [],
      steps: [],
      products: [],
      dishType: []
    };
  }));

  constructor(private route: ActivatedRoute, private fb: FormBuilder, public myRouter: Router, private dishService: DishStorageService) {
  }

  ngOnInit(): void {
  }

  nameChanged() {
    console.log('Wykryto zmianę nazwy');
    console.log(this.model.value.name);
    this.nameChange.emit(this.model.value.name);
  }

  stepsEdtied(event) {
    this.stepsEmitter.emit(event);
  }

  editable() {
    if (this.edit === true) {
      this.nameChanged();
    }
    this.edit = !this.edit;
  }

  addUsedProduct(event) {
    this.usedProductToAdd.emit(event);
  }

  addProduct(event) {
    this.addedProduct.emit(event);
  }

  redirectTo() {
    this.edit = true;
  }

  new() {
    if (this.reset === true) {
      this.model.reset();
    }
  }

  typeEdition(event) {
    console.log(111);
    console.log(event);
    console.log(this.model.value.dishType);
    // this.typeChange.emit(this.model.value.dishType);
  }

}

function forbiddenNameValidator(): ValidatorFn {
  return null;
}

