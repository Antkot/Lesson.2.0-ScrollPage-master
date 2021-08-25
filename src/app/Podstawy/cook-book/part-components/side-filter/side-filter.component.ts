import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { Dish, Levels } from '../../types';
import { ChipService } from '../services/chip.service';
import { DishStorageService } from '../services/dish-storage.service';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  dishes$: Observable<Array<Dish>> = this.dishStorage.dishes$;
  levels$: Observable<Array<Levels>> = this.loadingService.levels$;
  tag: string = null;

  counter(i: number) {
    return new Array(i);
  }

  constructor(private loadingService: LoadingService, private chipService: ChipService, private  dishStorage: DishStorageService) {

  }

  ngOnInit(): void {
  }

  addTag(x: string) {
   this.tag = this.chipService.addTag(x);
   console.log((this.tag));
  }

}


