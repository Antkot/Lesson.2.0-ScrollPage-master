import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MainScreenComponent } from './main-screen.component';
import { MenuComponent } from '../../part-components/menu/menu.component';

const decoration: NgModule = {
  declarations: [MainScreenComponent, MenuComponent],
  imports: [ ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('sorter', () => ({
    props: {} as Partial<MainScreenComponent>,
    component: MainScreenComponent
  }));
