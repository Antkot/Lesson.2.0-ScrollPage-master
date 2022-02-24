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
import { AddRecipeComponent } from '../../add-recipe/add-recipe.component';
import { ChipsComponent } from '../../chips/chips.component';
import { StepsComponent } from '../../steps/steps.component';
import { IngredientsComponent } from '../../ingredients/ingredients.component';
import { IngredientDialogComponent } from '../../ingredient-dialog/ingredient-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { DishTypeComponent } from '../../dish-type/dish-type.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

const decoration: NgModule = {
  declarations: [
  ],
  imports: [
  ],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleInputComponent', () => ({
    props: {} as Partial<DaysFormuleComponent>,
    component: DaysFormuleComponent
  }));


