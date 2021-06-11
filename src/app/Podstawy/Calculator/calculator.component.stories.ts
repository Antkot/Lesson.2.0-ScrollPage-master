import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { CalculatorComponent } from './calculator.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';


const decoration: NgModule = {
  declarations: [CalculatorComponent, ToDoListComponent],
  imports: [
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, MatCheckboxModule
  ],
  providers: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('kalkulator', () => ({
    props: {} as Partial<CalculatorComponent>,

    component: CalculatorComponent
  }));
