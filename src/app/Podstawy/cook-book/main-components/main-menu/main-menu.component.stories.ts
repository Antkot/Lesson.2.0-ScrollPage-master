import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MainMenuComponent } from './main-menu.component';
import { MenuComponent } from '../../part-components/menu/menu.component';
import { SearchBarComponent } from '../../part-components/search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';

const decoration: NgModule = {
  declarations: [
    MainMenuComponent,
    MenuComponent,
    SearchBarComponent
  ],
  imports: [
    MatIconModule
  ],
  providers: []
};

storiesOf('Podstawy / cook / main', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('main menu', () => ({
    props: {} as Partial<MainMenuComponent>,
    component: MainMenuComponent
  }));
