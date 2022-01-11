import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { FormuleInputComponent } from './formule-input.component';

const decoration: NgModule = {
  declarations: [],
  imports: [],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleInputComponent', () => ({
    props: {} as Partial<FormuleInputComponent>,
    component: FormuleInputComponent
  }));


