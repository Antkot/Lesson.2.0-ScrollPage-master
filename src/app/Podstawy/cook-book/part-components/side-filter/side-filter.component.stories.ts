import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { SideFilterComponent } from './side-filter.component';

const decoration: NgModule = {
  declarations: [SideFilterComponent],
  imports: [],
  providers: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('side-filter', () => ({
    props: {} as Partial<SideFilterComponent>,
    component: SideFilterComponent
  }));
