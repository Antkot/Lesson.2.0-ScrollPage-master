import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { AppModule } from '../../app.module';
import { ToDoTestComponent } from './to-do-test.component';

const decoration: NgModule = {
  declarations: [],
  imports: [AppModule],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('ToDoTestComponent', () => ({
    props: {} as Partial<ToDoTestComponent>,
    component: ToDoTestComponent
  }));

