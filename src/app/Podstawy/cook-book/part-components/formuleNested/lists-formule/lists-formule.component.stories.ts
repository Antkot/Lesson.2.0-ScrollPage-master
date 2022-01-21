import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { ListsFormuleComponent } from './lists-formule.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ThirdComponent } from '../third/third.component';
import { FourthComponent } from '../fourth/fourth.component';
import { DaysFormuleComponent } from '../days-formule/days-formule.component';

const decoration: NgModule = {
  declarations: [DaysFormuleComponent, ThirdComponent, FourthComponent],
  imports: [
    MatIconModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,

  ],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleComponent', () => ({
    props: {} as Partial<ListsFormuleComponent>,
    component: ListsFormuleComponent
  }));


