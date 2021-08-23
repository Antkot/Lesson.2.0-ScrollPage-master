import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { MenuComponent } from './menu.component';
import { withKnobs } from '@storybook/addon-knobs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';

const decoration: NgModule = {
  declarations: [
    MenuComponent,
    SearchBarComponent
  ],
  imports: [
    MatIconModule
  ],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('menu', () => ({
    props: {} as Partial<MenuComponent>,
    component: MenuComponent
  }));
