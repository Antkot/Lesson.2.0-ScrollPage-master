import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { DishStorageService } from '../services/dish-storage.service';
import { first, map, take, takeUntil } from 'rxjs/operators';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { AbandonEditionComponent } from '../abandon-edition/abandon-edition.component';
import { MatDialog } from '@angular/material/dialog';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { AddedProductType, BothIdType, Dish } from '../../types';
import * as cuid from 'cuid';
import { DishIdGeneratorService } from '../services/dish-id-generator.service';
import { LoadingService } from '../services/loading.service';
import { Location } from '@angular/common';
import { UrlService } from '../services/url.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  target = '';
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
    private urlService: UrlService
  ) {
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


  redirected(param: string) {
    this.target = param;
    this.edition$.pipe(first()).subscribe(edition => {
      this.editionInProgress$.pipe(first()).subscribe(editionInProgress => {
        if (edition === true && editionInProgress === true) {
          const dialogRef = this.dialog.open(AbandonEditionComponent);
          dialogRef.componentInstance.go.pipe(takeUntil(dialogRef.afterClosed())).subscribe((result: AddedProductType) => {
            switch (param) {
              case 'redirect':
                this.edition$.next(false);
                this.myRouter.navigate(['../main']);
                break;
              case 'redirectToNew':
                this.edition$.next(true);
                // this.filteredDishType$.next(null);
                // this.dishesListCopied$.next({
                //   dishId: '',
                //   name: 'xD',
                //   steps: [],
                //   dishType: [],
                //   tags: [],
                //   products: []
                // });
                this.myRouter.navigate(['../recipe/', this.idGenerator.generateId()]);
                break;
              case 'backClicked':
                this.location.back();
                this.edition$.next(false);
                break;
              default:
                break;
            }
            this.dishService.abandonEdition();
            dialogRef.close();
          });
          dialogRef.componentInstance.cancel.pipe(takeUntil(dialogRef.afterClosed())).subscribe(() => {
            dialogRef.close();
          });
        } else {
          switch (param) {
            case 'redirect':
              this.myRouter.navigate(['../main']);
              break;
            case 'redirectToNew':
              this.edition$.next(true);
              // this.dishesListCopied$.next({
              //   dishId: '',
              //   name: 'xD',
              //   steps: [],
              //   dishType: [],
              //   tags: [],
              //   products: []
              // });
              this.myRouter.navigate(['../recipe/', this.idGenerator.generateId()]);
              break;
            case 'backClicked':
              this.location.back();
              break;
            default:
              break;
          }
        }
      });
    });
  }

}
