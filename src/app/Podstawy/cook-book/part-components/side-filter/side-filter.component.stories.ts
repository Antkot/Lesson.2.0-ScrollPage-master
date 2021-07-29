import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { SideFilterComponent } from './side-filter.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TimeSliderComponent } from '../time-slider/time-slider.component';


const decoration: NgModule = {
  declarations: [SideFilterComponent, TimeSliderComponent],
  imports: [MatDividerModule, MatExpansionModule, BrowserAnimationsModule, MatCheckboxModule, MatIconModule,
    MatRadioModule, NgxSliderModule],
  providers: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('side-filter', () => ({
    props: {
      minValue: 200,
      maxValue: 500
    } as Partial<SideFilterComponent>,
    component: SideFilterComponent
  }));
