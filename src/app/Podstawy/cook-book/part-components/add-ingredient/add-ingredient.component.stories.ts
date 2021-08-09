import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { AddIngredientComponent } from './add-ingredient.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


const decoration: NgModule = {
  declarations: [AddIngredientComponent],
  imports: [MatDialogModule, MatButtonModule],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('Add-Ingredient', () => ({
    props: {} as Partial<AddIngredientComponent>,
    component: AddIngredientComponent
  }));
