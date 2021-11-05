import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CookBookModule } from '../../cook-book.module';


const decoration: NgModule = {
  declarations: [
  ],
  imports: [
    CookBookModule,
    MatIconModule,
    RouterModule
  ],
  providers: []
};

storiesOf('Podstawy / cook / main', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('main page', () => ({
    props: {},
    template: `
<app-main-screen></app-main-screen>`
  }));
