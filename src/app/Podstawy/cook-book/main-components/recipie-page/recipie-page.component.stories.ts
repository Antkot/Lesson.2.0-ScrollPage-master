import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { RecipiePageComponent } from './recipie-page.component';

const decoration: NgModule = {
  declarations: [
    RecipiePageComponent],
  imports: [],
  providers: []
};

storiesOf('Podstawy / cook / main', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('main page of recipie', () => ({
    props: {} as Partial<RecipiePageComponent>,
    component: RecipiePageComponent
  }));
