import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DishType } from '../../types';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-dish-type',
  templateUrl: './dish-type.component.html',
  styleUrls: ['./dish-type.component.scss']
})
export class DishTypeComponent implements OnInit {
  dishes$: Observable<Array<DishType>> = this.loadingService.dishes$;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
