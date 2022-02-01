import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { ListsFormuleComponent } from './lists-formule.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DishFormuleComponent } from '../dish-formule/dish-formule.component';
import { DaysFormuleComponent } from '../days-formule/days-formule.component';
import { MealFormuleComponent } from '../meal-formule/meal-formule.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const decoration: NgModule = {
  declarations: [DaysFormuleComponent, MealFormuleComponent, DishFormuleComponent],
  imports: [
    MatIconModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    DragDropModule,
    MatAutocompleteModule

  ],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleComponent', () => ({
    props: {} as Partial<ListsFormuleComponent>,
    component: ListsFormuleComponent
  }));


