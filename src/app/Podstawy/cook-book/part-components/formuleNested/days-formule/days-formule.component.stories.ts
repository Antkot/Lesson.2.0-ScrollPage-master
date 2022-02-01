import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { DaysFormuleComponent } from './days-formule.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DishFormuleComponent } from '../dish-formule/dish-formule.component';
import { MatSelectModule } from '@angular/material/select';
import { MealFormuleComponent } from '../meal-formule/meal-formule.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const decoration: NgModule = {
  declarations: [DaysFormuleComponent, MealFormuleComponent, DishFormuleComponent],
  imports: [MatIconModule, BrowserModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleInputComponent', () => ({
    props: {} as Partial<DaysFormuleComponent>,
    component: DaysFormuleComponent
  }));


