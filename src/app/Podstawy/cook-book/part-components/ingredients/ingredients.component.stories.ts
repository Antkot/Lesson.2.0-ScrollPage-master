import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { IngredientsComponent } from './ingredients.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddIngredientComponent, IngredientDialogComponent } from '../add-ingredient/add-ingredient.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const decoration: NgModule = {
  declarations: [
    IngredientsComponent,
    AddIngredientComponent,
    IngredientDialogComponent
  ],
  imports: [
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    IngredientDialogComponent
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('Ingredients edit', () => ({
    props: {} as Partial<IngredientsComponent>,
    component: IngredientsComponent,
    template: `
    <app-ingredients  [edit]="true">
    `
  }));

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('Ingredients view', () => ({
    props: {} as Partial<IngredientsComponent>,
    component: IngredientsComponent,
    template: `
    <app-ingredients  [edit]="false">
    `
  }));

