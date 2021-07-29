import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { MenuComponent } from './menu.component';
import { withKnobs } from '@storybook/addon-knobs';

const decoration: NgModule = {
  declarations: [MenuComponent],
  imports: [],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('menu', () => ({
    props: {} as Partial<MenuComponent>,
    component: MenuComponent
  }));
