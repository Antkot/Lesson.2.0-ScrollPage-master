import { ToDoListComponent } from './to-do-list.component';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalculatorComponent } from '../Calculator/calculator.component';
import { TicTacToeComponent } from '../tic-tac-toe/tic-tac-toe.component';
import { BehaviorSubject } from 'rxjs';

export interface tablicaToDo {
  text: string;
  textId: string;
  state: boolean;
  // priority
}

const decoration: NgModule = {
  declarations: [ToDoListComponent, CalculatorComponent, TicTacToeComponent],
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, MatCheckboxModule
  ],
  providers: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('ListaToDo', () => ({
    props: {} as Partial<ToDoListComponent>,

    component: ToDoListComponent
  }));
