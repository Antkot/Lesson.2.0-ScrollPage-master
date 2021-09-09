import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MenuComponent } from '../../part-components/menu/menu.component';
import { SearchBarComponent } from '../../part-components/search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MainPageComponent } from './main-page.component';

const decoration: NgModule = {
  declarations: [
    MainPageComponent,
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
  .add('main page', () => ({
    props: {} as Partial<MainPageComponent>,
    component: MainPageComponent
  }));
