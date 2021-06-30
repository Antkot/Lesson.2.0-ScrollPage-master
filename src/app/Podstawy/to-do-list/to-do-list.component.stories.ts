import { ToDoListComponent } from './to-do-list.component';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { Component, NgModule, OnInit } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { Router, RouterModule } from '@angular/router';
import { AppModule } from '../../app.module';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ToDoListService } from './to-do-list.service';

@Component({
  selector: 'loader',
  template: ``
})
export class LoadingComponent implements OnInit {

  table$: Observable<TableData> = this.service.table$;

  constructor(public myRouter: Router, private service: ToDoListService) {
  }

  ngOnInit() {
    this.table$.pipe(first()).subscribe(table => {
      this.myRouter.navigate(['/todo', table.tableId]);
    });
  }
}

export interface TablicaToDo {
  text: string;
  textId: string;
  state: boolean;
}

export interface TableData {
  tableId: string;
  parentId: string;
  toDo: Array<TablicaToDo>;
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
