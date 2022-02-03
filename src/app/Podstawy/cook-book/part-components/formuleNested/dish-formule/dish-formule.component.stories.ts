import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatMenuModule } from '@angular/material/menu';
import { DishFormuleComponent } from './dish-formule.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import Fuse from 'fuse.js';
import { AddRecipeComponent } from '../../add-recipe/add-recipe.component';
import { ChipsComponent } from '../../chips/chips.component';
import { StepsComponent } from '../../steps/steps.component';
import { IngredientsComponent } from '../../ingredients/ingredients.component';
import { IngredientDialogComponent } from '../../ingredient-dialog/ingredient-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  .add('FourthComponent', () => ({
    props: {},
    template: `
  <loader></loader>
  <router-outlet></router-outlet>
`
  }));
