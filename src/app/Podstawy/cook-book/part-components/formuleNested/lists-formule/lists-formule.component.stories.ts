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
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddRecipeComponent } from '../../add-recipe/add-recipe.component';
import { ChipsComponent } from '../../chips/chips.component';
import { StepsComponent } from '../../steps/steps.component';
import { IngredientsComponent } from '../../ingredients/ingredients.component';
import { IngredientDialogComponent } from '../../ingredient-dialog/ingredient-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { DishTypeComponent } from '../../dish-type/dish-type.component';
import { CookBookModule } from '../../../cook-book.module';

const decoration: NgModule = {
  declarations: [],
  imports: [CookBookModule],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleComponent', () => ({
    props: {} as Partial<ListsFormuleComponent>,
    component: ListsFormuleComponent
  }));


