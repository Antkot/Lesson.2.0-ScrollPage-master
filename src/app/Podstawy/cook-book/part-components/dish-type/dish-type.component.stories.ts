import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { DishTypeComponent } from './dish-type.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

const decoration: NgModule = {
  declarations: [
    DishTypeComponent,
  ],
  imports: [
    MatCheckboxModule
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts ', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('dish-type', () => ({
    props: {} as Partial<DishTypeComponent>,
    component: DishTypeComponent
  }));
