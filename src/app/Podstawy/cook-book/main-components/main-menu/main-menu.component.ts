import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish, DishType } from '../../types';
import { LoadingService } from '../../part-components/services/loading.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  dishes$: Observable<Array<DishType>> = this.loadingService.dishes$;
  dishType$: Observable<{ dishId: string; }>;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }
  dishTyped(dishType: string) {
    console.log(dishType);
    // this.dishType$.next({ dishId: dishType });
  }
}
