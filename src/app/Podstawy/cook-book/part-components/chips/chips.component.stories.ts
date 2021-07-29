import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { ChipsComponent } from './chips.component';
import { MatChipsModule } from '@angular/material/chips';

const decoration: NgModule = {
  declarations: [ChipsComponent],
  imports: [MatChipsModule]
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('chip', () => ({
    props: {} as Partial<ChipsComponent>,
    component: ChipsComponent
  }));
