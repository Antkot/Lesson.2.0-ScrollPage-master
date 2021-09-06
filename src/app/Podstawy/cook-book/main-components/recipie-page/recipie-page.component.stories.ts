import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { RecipiePageComponent } from './recipie-page.component';
import { MenuComponent } from '../../part-components/menu/menu.component';
import { SearchBarComponent } from '../../part-components/search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AddRecipeComponent } from '../../part-components/add-recipe/add-recipe.component';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChipsComponent } from '../../part-components/chips/chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { StepsComponent } from '../../part-components/steps/steps.component';
import { MatMenuModule } from '@angular/material/menu';
import { IngredientsComponent } from '../../part-components/ingredients/ingredients.component';
import { MatTableModule } from '@angular/material/table';
import { AddIngredientComponent, IngredientDialogComponent } from '../../part-components/add-ingredient/add-ingredient.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TagNameByIdPipe } from '../../pipes/tag-name-by-id.pipe';

const decoration: NgModule = {
  declarations: [
    RecipiePageComponent,
    MenuComponent,
    SearchBarComponent,
    AddRecipeComponent,
    ChipsComponent,
    StepsComponent,
    IngredientsComponent,
    AddIngredientComponent,
    IngredientDialogComponent,
    TagNameByIdPipe
  ],
  imports: [
    MatIconModule,
    MatDividerModule,
    DragDropModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatMenuModule,
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

storiesOf('Podstawy / cook / main', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('main page of recipie', () => ({
    props: {} as Partial<RecipiePageComponent>,
    component: RecipiePageComponent
  }));
