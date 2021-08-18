import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { SorterComponent } from './sorter.component';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const decoration: NgModule = {
  declarations: [SorterComponent],
  imports: [BrowserAnimationsModule, MatSelectModule ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('sorter', () => ({
    props: {} as Partial<SorterComponent>,
    component: SorterComponent
  }));
