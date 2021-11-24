import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Dish } from '../../types';
import { DishStorageService } from '../services/dish-storage.service';
import { first, map, share, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as cuid from 'cuid';
import { LoadingService } from '../services/loading.service';
import { DishIdGeneratorService } from '../services/dish-id-generator.service';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.scss']
})
export class ListedComponent implements OnInit {
  randomDishId = cuid();
  filteredDishType$: Observable<string> = this.loadingService.filteredDishType$;
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  dishType$: Observable<string> = combineLatest([this.activatedRoute.paramMap
    .pipe(map(() => history.state))]).pipe(map(([{ dishTypeId }]) => {
    return dishTypeId;
  }));

  dishes = [];
  // shownDishesList$: Observable<Array<Dish>> = combineLatest([this.dishType$, this.dishesList$]).pipe(
  shownDishesList$: Observable<Array<Dish>> = combineLatest([this.filteredDishType$, this.dishesList$]).pipe(
    map(([dishTyped, dishesList]) => {
      return dishesList.filter(({ dishType }) => dishType.find(({ dishId }) => dishId === dishTyped));
    }), shareReplay(1));
  edition$ = this.loadingService.edition$;
  lastLink$ = this.loadingService.lastLink$;

  constructor(
    private dishesService: DishStorageService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private idGenerator: DishIdGeneratorService,
    private route: ActivatedRoute,
    private myRouter: Router
  ) {
  }

  ngOnInit() {
  }

  deleteDish(dishId: string) {
    this.dishesService.deleteDish(dishId);
  }

  redirect() {
    this.edition$.next(true);
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
    console.log('Zmieniono ostatni link. Teraz to: ');
    this.lastLink$.pipe(first()).subscribe(value => console.log(value));
    this.myRouter.navigate(['../recipe/', this.idGenerator.generateId()]);
  }

  redirectView(edit: boolean, dishId: string) {
    if (edit) {
      this.edition$.next(true);
    } else {
      this.edition$.next(false);
    }
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
    console.log('Zmieniono ostatni link. Teraz to: ');
    this.lastLink$.pipe(first()).subscribe(value => console.log(value));
    this.myRouter.navigate(['../recipe/', dishId]);
  }
}
