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
import { ThirdComponent } from '../formuleNested/third/third.component';
import { FourthComponent } from '../formuleNested/fourth/fourth.component';
// import {MatDatepickerModule} from '@angular/material/datepicker';

const decoration: NgModule = {
  declarations: [FormuleInputComponent, ThirdComponent, FourthComponent],
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


