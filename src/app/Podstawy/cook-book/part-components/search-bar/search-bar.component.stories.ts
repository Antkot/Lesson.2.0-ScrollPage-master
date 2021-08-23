import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { SearchBarComponent } from './search-bar.component';
import {MatIconModule} from '@angular/material/icon';

const decoration: NgModule = {
  declarations: [
    SearchBarComponent
  ],
  imports: [
    MatIconModule
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('search-bar', () => ({
    props: {} as Partial<SearchBarComponent>,
    component: SearchBarComponent
  }));
