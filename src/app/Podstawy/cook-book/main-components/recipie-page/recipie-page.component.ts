import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DishStorageService } from '../../part-components/services/dish-storage.service';

@Component({
  selector: 'app-recipie-page',
  templateUrl: './recipie-page.component.html',
  styleUrls: ['./recipie-page.component.scss']
})
export class RecipiePageComponent implements OnInit {
  edit = true;

  // editable$: Observable<object>;
  // name$: Observable<object>;
  // tags$: Observable<Array<{ hashId: string }>>;
  // steps$: Observable<string>;
  // products$: Observable<Array<{ productId: string }>>;
  temporary;

  constructor(public activatedRoute: ActivatedRoute, private dishService: DishStorageService) {

  }

  ngOnInit(): void {


    // tylko raz odplaić fuinkcję, teraz za dużo


    this.edit = this.saveData().edit;
    if (this.edit === undefined) {
      this.edit = true;

    }
    // this.dish = this.saveData().dish;
     // this.name$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state));
    // this.name$.subscribe(data => this.temporary = data);
    // this.name = this.temporary.name;
  }

  saveData() {
    const stream$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    stream$.subscribe(data => this.temporary = data);
    return this.temporary;
  }


}
