import { Component, NgModule, OnInit } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CookBookModule } from '../../cook-book.module';
import { Observable } from 'rxjs';
import { DishStorageService } from '../../part-components/services/dish-storage.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'loader',
  template: ``
})
export class LoadingComponent implements OnInit {

  constructor(public myRouter: Router, private dishService: DishStorageService) {
  }
  ngOnInit() {
    // this.myRouter.navigate(['/main']);
  }
}

const decoration: NgModule = {
  declarations: [
    LoadingComponent
  ],
  imports: [
    CookBookModule,
    MatIconModule,
    RouterModule
  ],
  providers: []
};

storiesOf('Podstawy / cook / main', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('main page', () => ({
    props: {},
    template: `
  <loader></loader>
  <router-outlet></router-outlet>
`
  }));
