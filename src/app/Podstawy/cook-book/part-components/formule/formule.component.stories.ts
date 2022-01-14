import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { FormuleComponent } from './formule.component';
import { FormuleInputComponent } from '../formule-input/formule-input.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
// import {MatDatepickerModule} from '@angular/material/datepicker';

const decoration: NgModule = {
  declarations: [FormuleComponent, FormuleInputComponent],
  imports: [
    MatIconModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // MatDatepickerModule
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('FormuleComponent', () => ({
    props: {} as Partial<FormuleComponent>,
    component: FormuleComponent
  }));


