import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { DaysFormuleComponent } from './days-formule.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThirdComponent } from '../third/third.component';
import { FourthComponent } from '../fourth/fourth.component';
import { MatSelectModule } from '@angular/material/select';

const decoration: NgModule = {
  declarations: [DaysFormuleComponent, ThirdComponent, FourthComponent],
  imports: [MatIconModule, BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleInputComponent', () => ({
    props: {} as Partial<DaysFormuleComponent>,
    component: DaysFormuleComponent
  }));


