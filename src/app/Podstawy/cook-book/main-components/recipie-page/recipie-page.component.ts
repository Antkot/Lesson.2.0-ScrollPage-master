import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipie-page',
  templateUrl: './recipie-page.component.html',
  styleUrls: ['./recipie-page.component.scss']
})
export class RecipiePageComponent implements OnInit {
  edit = false;
  name = '';
  tags = [];
  steps = [];
  products = [];

  // editable$: Observable<object>;
  // name$: Observable<object>;
  // tags$: Observable<Array<{ hashId: string }>>;
  // steps$: Observable<string>;
  // products$: Observable<Array<{ productId: string }>>;
  temporary;

  constructor(public activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // tylko raz odplaić fuinkcję, teraz za dużo


    this.edit = this.saveData().edit;
    // this.editable$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state));
    // this.editable$.subscribe(data => this.temporary = data);
    // this.edit = this.temporary.edit;

    this.name = this.saveData().name;
    // this.name$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state));
    // this.name$.subscribe(data => this.temporary = data);
    // this.name = this.temporary.name;

    this.tags = this.saveData().tags;
    // this.tags$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state));
    // this.tags$.subscribe(data => this.temporary = data);
    // this.tags = this.temporary.tags;

    this.steps = this.saveData().steps;
    // this.steps$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state));
    // this.steps$.subscribe(data => this.temporary = data);
    // this.steps = this.temporary.steps;

    this.products = this.saveData().products;
    // this.products$ = this.activatedRoute.paramMap
    //   .pipe(map(() => window.history.state));
    // this.products$.subscribe(data => this.temporary = data);
    // this.products = this.temporary.products;
    console.log(this.products);
  }

  saveData() {
    console.log(window.history.state);
    const stream$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    stream$.subscribe(data => this.temporary = data);
    return this.temporary;
  }


}
