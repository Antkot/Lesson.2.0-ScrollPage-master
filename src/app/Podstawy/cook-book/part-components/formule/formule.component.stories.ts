import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { FormuleComponent } from './formule.component';

const decoration: NgModule = {
  declarations: [],
  imports: [],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleComponent', () => ({
    props: {} as Partial<FormuleComponent>,
    component: FormuleComponent
  }));


