import { ToDoListComponent } from './to-do-list.component';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { Component, NgModule, OnInit } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { Router, RouterModule } from '@angular/router';
import { AppModule } from '../../app.module';

@Component({
  selector: 'loader',
  template: ``
})
export class LoadingComponent implements OnInit {
  constructor(public myRouter: Router) {
  }

  ngOnInit() {
    this.myRouter.navigate(['/todo']);
  }
}

export interface tablicaToDo {
  text: string;
  textId: string;
  state: boolean;
}

export interface tableData {
  tableId: string;
  toDo: Array<tablicaToDo>;
}

const decoration: NgModule = {
  declarations: [LoadingComponent],
  imports: [
    AppModule, RouterModule
  ],
  providers: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('ListaToDo', () => ({
    props: {} as Partial<ToDoListComponent>,

    component: ToDoListComponent,
    template: `
<loader></loader>
<router-outlet></router-outlet>
`
  }));
