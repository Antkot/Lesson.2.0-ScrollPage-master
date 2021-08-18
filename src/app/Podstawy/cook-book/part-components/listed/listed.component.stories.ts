import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { ListedComponent } from './listed.component';
import { MatDividerModule } from '@angular/material/divider';
import { SorterComponent } from '../sorter/sorter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatRadioButton } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { TimeSliderComponent } from '../time-slider/time-slider.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ChipsComponent } from '../chips/chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const decoration: NgModule = {
  declarations: [ListedComponent,
    SorterComponent,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatRadioButton,
    MatCheckbox,
    MatAccordion,
    TimeSliderComponent,
    ChipsComponent
  ],
  imports: [
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatDividerModule,
    MatSelectModule,
    PortalModule,
    MatRippleModule,
    NgxSliderModule,
    BrowserAnimationsModule
  ],
  providers: []
};

storiesOf('Podstawy / cook / main', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('listed', () => ({
    props: {} as Partial<ListedComponent>,
    component: ListedComponent
  }));
