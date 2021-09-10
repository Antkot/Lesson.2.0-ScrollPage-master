import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { AddRecipeComponent } from './add-recipe.component';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChipsComponent } from '../chips/chips.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { StepsComponent } from '../steps/steps.component';
import { MatMenuModule } from '@angular/material/menu';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { MatTableModule } from '@angular/material/table';
import { AddIngredientComponent, IngredientDialogComponent } from '../add-ingredient/add-ingredient.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const decoration: NgModule = {
  declarations: [
    AddRecipeComponent,
    ChipsComponent,
    StepsComponent,
    IngredientsComponent,
    AddIngredientComponent,
    IngredientDialogComponent
  ],
  imports: [
    MatDividerModule,
    DragDropModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    IngredientDialogComponent
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('view-recipe', () => ({
    props: {} as Partial<AddRecipeComponent>,
    component: AddRecipeComponent,
    template: `
<app-add-recipe [edit]="false">;
`
  }));
storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('add-recipe', () => ({
    props: {} as Partial<AddRecipeComponent>,
    component: AddRecipeComponent,
    template: `
<app-add-recipe [edit]="true">;
`
  }));
