import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatMenuModule } from '@angular/material/menu';
import { DishFormuleComponent } from './dish-formule.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import Fuse from 'fuse.js';


const decoration: NgModule = {
  declarations: [
    DishFormuleComponent
  ],
  imports: [
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    Fuse
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
