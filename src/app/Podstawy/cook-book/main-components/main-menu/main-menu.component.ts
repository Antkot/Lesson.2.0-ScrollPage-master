import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../../types';
import { LoadingService } from '../../part-components/services/loading.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  dishes$: Observable<Array<Dish>> = this.loadingService.dishes$;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
  }

}
