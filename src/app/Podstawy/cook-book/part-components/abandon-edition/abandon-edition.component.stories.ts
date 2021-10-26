import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { AbandonEditionComponent } from './abandon-edition.component';

const decoration: NgModule = {
  declarations: [
    AbandonEditionComponent,
  ],
  imports: [
  ],

  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('AbandonEditionComponent', () => ({
    props: {} as Partial<AbandonEditionComponent>,
    component: AbandonEditionComponent,
  }));

