import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { DishStorageService } from '../services/dish-storage.service';
import { first, map, take } from 'rxjs/operators';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { AbandonEditionComponent } from '../abandon-edition/abandon-edition.component';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { Dish } from '../../types';
import * as cuid from 'cuid';
import { DishIdGeneratorService } from '../services/dish-id-generator.service';
import { LoadingService } from '../services/loading.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishesListCopied$: BehaviorSubject<Dish> = this.dishService.dishesListCopied$;
  // editionInProgress$: BehaviorSubject<boolean> = this.dishService.editionInProgress$;
  edition$ = this.loadingService.edition$;
  lastLink$ = this.loadingService.lastLink$;

  // beforeEdition$: Observable<Dish> = this.addRecipeComponent.recipe2$;

  constructor(
    private myRouter: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dishService: DishStorageService,
    public dialog: MatDialog,
    private idGenerator: DishIdGeneratorService,
    private loadingService: LoadingService,
    private location: Location
  ) {
  }
  backClicked() {
    this.location.back();
  }
    ngOnInit(): void {
    this.route.url.pipe(
      map(value => value[0].path)).pipe().subscribe(url => console.log('Wykryto zmianę URL:', url)
    );
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

  goBack() {
    this.lastLink$.pipe(first()).subscribe(value => {
      this.myRouter.navigate([value]);
    });
  }

  redirect() {
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
    console.log('Zmieniono ostatni link. Teraz to: ');
    this.lastLink$.pipe(first()).subscribe(value => console.log(value));
    this.myRouter.navigate(['../main']);
  }

  redirectTo() {
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
    console.log('Zmieniono ostatni link. Teraz to: ');
    this.lastLink$.pipe(first()).subscribe(value => console.log(value));
    this.abandonEdition();
    this.dishesListCopied$.next({
      dishId: '',
      name: '',
      steps: [],
      dishType: [],
      tags: [],
      products: []
    });
    this.edition$.next(true);
    // this.myRouter.navigate(['../recipe/new'], { state: { edit: true, reset: true } });
    this.myRouter.navigate(['../recipe/', this.idGenerator.generateId()]);
  }

  abandonEdition() {
    // this.editionInProgress$.subscribe(value => {
    //     if (value === true) {
    //       this.dialog.open(AbandonEditionComponent, { panelClass: 'dialog-container-custom' });
    //       console.log('EDYCJA PORZUCONA');
    //       console.log(value);
    //     }
    //   }
    // );
  }


}
