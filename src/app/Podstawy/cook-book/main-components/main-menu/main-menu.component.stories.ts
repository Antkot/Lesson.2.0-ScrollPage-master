import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MainMenuComponent } from './main-menu.component';

const decoration: NgModule = {
  declarations: [
    MainMenuComponent
  ],
  imports: [
  ],
  providers: []
};

storiesOf('Podstawy / cook / main', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('main page of list', () => ({
    props: {} as Partial<MainMenuComponent>,
    component: MainMenuComponent
  }));
