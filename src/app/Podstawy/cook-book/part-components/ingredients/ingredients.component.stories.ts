import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { IngredientsComponent } from './ingredients.component';
import { MatTableModule } from '@angular/material/table';

const decoration: NgModule = {
  declarations: [IngredientsComponent],
  imports: [MatTableModule],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('Ingredients', () => ({
    props: {} as Partial<IngredientsComponent>,
    component: IngredientsComponent,
  }));
