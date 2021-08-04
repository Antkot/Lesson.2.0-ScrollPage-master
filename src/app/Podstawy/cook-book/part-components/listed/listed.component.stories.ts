import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { ListedComponent } from './listed.component';

const decoration: NgModule = {
  declarations: [ListedComponent],
  imports: [],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('listed', () => ({
    props: {} as Partial<ListedComponent>,
    component: ListedComponent
  }));
