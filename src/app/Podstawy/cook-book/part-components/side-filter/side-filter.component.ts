import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { Dish, Levels } from '../../types';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  dishes$: Observable<Array<Dish>> = this.service.dishes$;
  levels$: Observable<Array<Levels>> = this.service.levels$;
  tag: string = null;

  counter(i: number) {
    return new Array(i);
  }

  constructor(private service: LoadingService) {

  }

  ngOnInit(): void {
  }

  addTag(x: string) {
  }

}


