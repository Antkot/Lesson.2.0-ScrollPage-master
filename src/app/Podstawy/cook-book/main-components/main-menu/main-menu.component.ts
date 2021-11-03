import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, DishType } from '../../types';
import { LoadingService } from '../../part-components/services/loading.service';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private dishStorageService: DishStorageService,
    private loadingService: LoadingService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {

  }
  dishTyped(dishType: string) {
    console.log(dishType);
    this.filteredDishType$.next(dishType);
  }
}
// const current = this.allergens$.value;
// this.allergens$.next(
//   [
//     ...current.filter(record => record.hashId !== deletedHash)
//   ]
// );
//
