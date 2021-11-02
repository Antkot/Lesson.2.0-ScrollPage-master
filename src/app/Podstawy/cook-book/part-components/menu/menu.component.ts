import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { DishStorageService } from '../services/dish-storage.service';
import { take } from 'rxjs/operators';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { AbandonEditionComponent } from '../abandon-edition/abandon-edition.component';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { Dish } from '../../types';
import * as cuid from 'cuid';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // dishesListCopied$: BehaviorSubject<Dish> = this.dishService.dishesListCopied$;
  editionInProgress$: BehaviorSubject<boolean> = this.dishService.editionInProgress$;

  // beforeEdition$: Observable<Dish> = this.addRecipeComponent.recipe2$;

  constructor(
    public myRouter: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dishService: DishStorageService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.beforeEdition$.pipe().subscribe(originalValue =>
    //   this.dishesListCopied$.subscribe(
    //     value => {
    //       if (value === originalValue) {
    //         this.editionInProgress$.next(false);
    //       } else {
    //         this.editionInProgress$.next(true);
    //       }
    //     })
    // );
  }

  redirectTo() {
    this.abandonEdition();
    const givenDishId = cuid();
    this.myRouter.navigate(['../recipe/', givenDishId], { state: { edit: true, reset: true } });
    // this.myRouter.navigate(['../recipe/new'], { state: { edit: true, reset: true } });
  }

  abandonEdition() {
    // this.editionInProgress$.subscribe(value => {
    //     if (value === true) {
    //       this.dialog.open(AbandonEditionComponent, { panelClass: 'dialog-container-custom' });
    //       console.log('EDYCJA PORZuCONa');
    //       console.log(value);
    //     }
    //   }
    // );
  }






}
