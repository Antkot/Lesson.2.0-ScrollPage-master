import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { SideFilterComponent } from './side-filter.component';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatRadioButton } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { TimeSliderComponent } from '../time-slider/time-slider.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsComponent } from '../chips/chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TagNameByIdPipe } from '../../pipes/tag-name-by-id.pipe';

const decoration: NgModule = {
    declarations: [
      SideFilterComponent,
      MatExpansionPanel,
      MatExpansionPanelTitle,
      MatExpansionPanelHeader,
      MatRadioButton,
      MatIcon,
      MatCheckbox,
      MatAccordion,
      TimeSliderComponent,
      ChipsComponent,
      TagNameByIdPipe
    ],
  imports: [
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    PortalModule,
    MatRippleModule,
    NgxSliderModule,
    BrowserAnimationsModule,
  ],
  providers: []
};

storiesOf('Podstawy / cook / parts', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('side-filter', () => ({
    props: {
      minValue: 200,
      maxValue: 500
    } as Partial<SideFilterComponent>,
    component: SideFilterComponent
  }));
