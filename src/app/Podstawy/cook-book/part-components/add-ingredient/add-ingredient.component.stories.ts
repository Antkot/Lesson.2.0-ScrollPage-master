import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { AddIngredientComponent, IngredientDialogComponent } from './add-ingredient.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const decoration: NgModule = {
  declarations: [
    AddIngredientComponent,
    IngredientDialogComponent,
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatDialogModule,
  ],
  entryComponents: [
    IngredientDialogComponent
  ],
  providers: []
};
// const actions = {
//   add: action('Product add') as any,
//   change: action('Product change') as any,
// } as Partial<FoodAddComponent>;



storiesOf('Podstawy/ cook / parts ', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('Add-Ingredient', () => ({
    props: {} as Partial<AddIngredientComponent>,
    component: AddIngredientComponent, IngredientDialogComponent
  }));
