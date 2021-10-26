import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { MenuComponent } from './menu.component';
import { withKnobs } from '@storybook/addon-knobs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { AbandonEditionComponent } from '../abandon-edition/abandon-edition.component';


const decoration: NgModule = {
  declarations: [
    MenuComponent,
    SearchBarComponent,
    AbandonEditionComponent
  ],
  imports: [
    MatIconModule,
    AbandonEditionComponent
  ],
  providers: [AbandonEditionComponent]
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('menu', () => ({
    props: {} as Partial<MenuComponent>,
    component: MenuComponent
  }));
