import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { IngredientsComponent } from './ingredients.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { MeasuresTranslatorPipe } from '../../pipes/measures-translator.pipe';


const decoration: NgModule = {
  declarations: [
    IngredientsComponent,
    AddIngredientComponent,
    IngredientDialogComponent,
    MeasuresTranslatorPipe
  ],
  imports: [
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MeasuresTranslatorPipe
  ],
  providers: [MeasuresTranslatorPipe]
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

