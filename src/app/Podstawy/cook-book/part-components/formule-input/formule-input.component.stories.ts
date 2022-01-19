import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { FormuleInputComponent } from './formule-input.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThirdComponent } from '../formuleNested/third/third.component';
import { FourthComponent } from '../formuleNested/fourth/fourth.component';

const decoration: NgModule = {
  declarations: [FormuleInputComponent, ThirdComponent, FourthComponent],
  imports: [MatIconModule, BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleInputComponent', () => ({
    props: {} as Partial<FormuleInputComponent>,
    component: FormuleInputComponent
  }));


