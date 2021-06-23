import { moduleMetadata, storiesOf } from '@storybook/angular';
import { Component, NgModule, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'loader',
  template: ``
})
export class LoadingComponent implements OnInit {
  constructor(public myRouter: Router) {
  }

  ngOnInit() {
    this.myRouter.navigate(['/ticTacToe']);
  }
}

const decoration: NgModule = {
  declarations: [LoadingComponent],
  imports: [AppModule, RouterModule],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('ticTacToe', () => ({
      props: {},
      template: `
  <loader></loader>
  <router-outlet></router-outlet>
`
  }));
