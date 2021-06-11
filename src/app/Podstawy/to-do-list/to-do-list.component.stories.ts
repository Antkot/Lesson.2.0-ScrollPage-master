import { ToDoListComponent } from './to-do-list.component';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalculatorComponent } from '../Calculator/calculator.component';

export interface tablicaToDo {
    text: string;
    lenght: number;
    state: boolean;
  // priority
}

const fejkteksty: Array<tablicaToDo> = [
  { text: 'Uprzedzić babcię i dziadka o pogrzebie niespodziance na ich urodziny', lenght: 20, state: false },
  { text: 'Wyrzucić śmieci', lenght: 7, state: true },
  { text: 'Podlać kwiatki', lenght: 5, state: false }
];
const decoration: NgModule = {
  declarations: [ToDoListComponent, CalculatorComponent],
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, MatCheckboxModule
  ],
  providers: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('ListaToDo', () => ({
    props: { table: fejkteksty } as Partial<ToDoListComponent>,

    component: ToDoListComponent
  }));
