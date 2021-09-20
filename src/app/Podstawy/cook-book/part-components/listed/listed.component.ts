import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish } from '../../types';
import { LoadingService } from '../services/loading.service';
import { DishStorageService } from '../services/dish-storage.service';

@Component({
  selector: 'app-listed',
  templateUrl: './listed.component.html',
  styleUrls: ['./listed.component.scss']
})
export class ListedComponent implements OnInit {
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;

  constructor(private dishesService: DishStorageService) {

  }

ngOnInit(): void {
  }


}
