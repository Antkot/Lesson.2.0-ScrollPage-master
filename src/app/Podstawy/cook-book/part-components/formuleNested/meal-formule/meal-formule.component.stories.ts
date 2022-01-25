import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import {MatMenuModule} from '@angular/material/menu';
import { MealFormuleComponent } from './meal-formule.component';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';


const decoration: NgModule = {
  declarations: [
    MealFormuleComponent
  ],
  imports: [MatMenuModule, MatSelectModule, DragDropModule
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('ThirdComponent', () => ({
    props: {},
    template: `
  <loader></loader>
  <router-outlet></router-outlet>
`
  }));
