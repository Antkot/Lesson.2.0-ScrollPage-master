import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { SideFilterComponent } from './side-filter.component';
import { CookBookModule } from '../../cook-book.module';


const decoration: NgModule = {
  declarations: [],
  imports: [CookBookModule],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('side-filter', () => ({
    props: {
      minValue: 200,
      maxValue: 500
    } as Partial<SideFilterComponent>,
    component: SideFilterComponent
  }));
