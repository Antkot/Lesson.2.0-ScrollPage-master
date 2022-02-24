import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import {MatMenuModule} from '@angular/material/menu';
import { MealFormuleComponent } from './meal-formule.component';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DishFormuleComponent } from '../dish-formule/dish-formule.component';
import { AddRecipeComponent } from '../../add-recipe/add-recipe.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChipsComponent } from '../../chips/chips.component';
import { StepsComponent } from '../../steps/steps.component';
import { IngredientsComponent } from '../../ingredients/ingredients.component';
import { IngredientDialogComponent } from '../../ingredient-dialog/ingredient-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { DishTypeComponent } from '../../dish-type/dish-type.component';


const decoration: NgModule = {
  declarations: [
  ],
  imports: [
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('ThirdComponent', () => ({
    props: {},
    template: `
  <loader></loader>
  <router-outlet></router-outlet>
`
  }));
