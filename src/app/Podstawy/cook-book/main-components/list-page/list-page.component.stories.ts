import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatRadioButton } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { PortalModule } from '@angular/cdk/portal';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListedComponent } from '../../part-components/listed/listed.component';
import { ChipsComponent } from '../../part-components/chips/chips.component';
import { SorterComponent } from '../../part-components/sorter/sorter.component';
import { SideFilterComponent } from '../../part-components/side-filter/side-filter.component';
import { TimeSliderComponent } from '../../part-components/time-slider/time-slider.component';
import { ListPageComponent } from './list-page.component';

const decoration: NgModule = {
  declarations: [ListedComponent,
    SorterComponent,
    SideFilterComponent,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatRadioButton,
    MatCheckbox,
    MatAccordion,
    TimeSliderComponent,
    ChipsComponent,
    ListPageComponent
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
  .add('main page of list', () => ({
    props: {} as Partial<ListPageComponent>,
    component: ListPageComponent
  }));
