import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { IngredientDialogComponent } from './ingredient-dialog.component';

const decoration: NgModule = {
  declarations: [
    IngredientDialogComponent
  ],
  imports: [
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('dialog', () => ({
    props: {},
    template: `
  <loader></loader>
  <router-outlet></router-outlet>
`
  }));
