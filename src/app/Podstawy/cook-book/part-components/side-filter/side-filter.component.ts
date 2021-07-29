import { Component, OnInit } from '@angular/core';
import { DishesService } from '../services/dishes.service';
import { Observable } from 'rxjs';
import { Dish } from '../../types';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  dishes$: Observable<Array<Dish>> = this.service.dishes$;

  constructor(private service: DishesService) {

  }

  ngOnInit(): void {
  }

}


