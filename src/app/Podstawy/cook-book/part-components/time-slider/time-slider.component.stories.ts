import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { TimeSliderComponent } from '../time-slider/time-slider.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Output, EventEmitter } from '@angular/core';

const decoration: NgModule = {
  declarations: [ TimeSliderComponent ],
  imports: [NgxSliderModule],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('time-slider', () => ({
    props: {
      minValue: 200,
      maxValue: 500
    } as Partial<TimeSliderComponent>,
    component: TimeSliderComponent
  }));
