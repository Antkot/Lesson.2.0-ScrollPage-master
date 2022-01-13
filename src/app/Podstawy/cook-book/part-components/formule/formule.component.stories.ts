import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { FormuleComponent } from './formule.component';
import { FormuleInputComponent } from '../formule-input/formule-input.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const decoration: NgModule = {
  declarations: [FormuleComponent, FormuleInputComponent],
  imports: [MatIconModule, BrowserModule,
    FormsModule, ReactiveFormsModule],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleComponent', () => ({
    props: {} as Partial<FormuleComponent>,
    component: FormuleComponent
  }));


