import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Dish } from '../../types';
import { LoadingService } from '../services/loading.service';
import { DishStorageService } from '../services/dish-storage.service';
import { first, map } from 'rxjs/operators';
import { xor } from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.scss']
})
export class ListedComponent implements OnInit {
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  dishType$: Observable<string> = combineLatest([this.activatedRoute.paramMap
    .pipe(map(() => history.state))]).pipe(map(([{ dishTypeId }]) => dishTypeId));

  dishes = [];
  shownDishesList$: Observable<Array<Dish>> = combineLatest([this.dishType$, this.dishesList$]).pipe(
    map(([dishTyped, dishesList]) => {
      const lo = dishesList.filter(({ dishType }) => dishType.find(({ dishId }) => dishId === dishTyped));

      console.log('Dania przed filtrowaniem: ');
      this.dishesList$.pipe(first()).subscribe(value => {
        console.table(value);
      });
      console.log('Typ : ');
      this.dishType$.pipe(first()).subscribe(value => {
        console.table(value);
      });
      console.log('filtrowanie: ');
      console.log(lo);

      return lo;
    }));

  constructor(private dishesService: DishStorageService, public activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

  }

  deleteDsih(dishId: string) {
    this.dishesService.deleteDish(dishId);
  }
}
