import {moduleMetadata, storiesOf} from '@storybook/angular';
import {Component, NgModule, OnInit} from '@angular/core';
import {withKnobs} from '@storybook/addon-knobs';
import {CalculatorComponent} from '../Calculator/calculator.component';
import {AppModule} from '../../app.module';
import {RouterModule} from '@angular/router';

const decoration: NgModule = {
  declarations: [],
  imports: [AppModule, RouterModule],
  exports: [],
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('ticTacToe', () => ({
    props: {},
    template: `
<button [routerLink]="'/ticTacToe'">pierwszy</button>
<button [routerLink]="'/calculator'">dddd</button>
<button [routerLink]="'/todo'">55555</button>
<router-outlet></router-outlet>
`
  }));
