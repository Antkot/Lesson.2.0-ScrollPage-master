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
import { UrlService } from '../services/url.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishesListCopied$: BehaviorSubject<Dish> = this.dishService.dishesListCopied$;
  editionInProgress$: BehaviorSubject<boolean> = this.dishService.editionInProgress$;
  edition$ = this.loadingService.edition$;
  lastLink$ = this.loadingService.lastLink$;
  filteredDishType$ = this.loadingService.filteredDishType$;

  // beforeEdition$: Observable<Dish> = this.addRecipeComponent.recipe2$;

  constructor(
    private myRouter: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dishService: DishStorageService,
    public dialog: MatDialog,
    private idGenerator: DishIdGeneratorService,
    private loadingService: LoadingService,
    private location: Location,
    private urlService: UrlService,

  ) {
  }
  backClicked() {
    this.abandonEdition();
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result == true){
    //     return true;
    //   }else{
    //     return false;
    //   }
    //
    this.location.back();
  }
    ngOnInit(): void {
      this.urlService.getUrl();
    //   this.route.url.pipe(
    //   map(value => value[0].path)).pipe().subscribe(url => console.log('Wykryto zmianę URL:', url)
    // );
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
    this.abandonEdition();
    this.myRouter.navigate(['../main']);
  }

  redirectTo() {
    this.filteredDishType$.next(null);
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
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
    this.editionInProgress$.pipe(first()).subscribe(value => {
        if (value === true) {
          const dialogRef = this.dialog.open(AbandonEditionComponent);
          console.log('EDYCJA PORZUCONA');
          console.log(value);
        }
      }
    );
  }


}
