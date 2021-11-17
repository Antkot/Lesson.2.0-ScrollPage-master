import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, DishType } from '../../types';
import { LoadingService } from '../../part-components/services/loading.service';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../part-components/services/local-storage-service';
import { DishStorageService } from '../../part-components/services/dish-storage.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  dishes$: BehaviorSubject<Array<DishType>> = this.loadingService.dishes$;
  filteredDishType$ = this.loadingService.filteredDishType$;
  lastLink$ = this.loadingService.lastLink$;

  constructor(
    private dishStorageService: DishStorageService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private myRouter: Router
  ) {
  }

  ngOnInit(): void {}

  redirect() {
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
    this.myRouter.navigate(['../list']);
  }

  dishTyped(dishTyped: string) {
    console.log(dishTyped);
    this.dishes$.pipe(first()).subscribe(dishType => {
      const x = dishType.find(
        ({ name }) =>
          name === dishTyped
      ).dishId;
      this.filteredDishType$.next(x);
    });
    this.redirect();
  }

  // this.measures$.pipe(first()).subscribe(measure => {
  // this.typedMeasureId = measure.find(
  //   ({ name }) =>
  //     name === addedProduct.product.measure
  // )?.measureId;
// });
}

// const current = this.allergens$.value;
// this.allergens$.next(
//   [
//     ...current.filter(record => record.hashId !== deletedHash)
//   ]
// );
//
