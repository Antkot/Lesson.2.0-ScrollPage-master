import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainScreenComponent } from './main-screen.component';

const decoration: NgModule = {
  declarations: [MainScreenComponent],
  imports: [ ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('sorter', () => ({
    props: {} as Partial<MainScreenComponent>,
    component: MainScreenComponent
  }));
