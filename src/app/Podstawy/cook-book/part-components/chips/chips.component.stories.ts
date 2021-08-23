import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { ChipsComponent } from './chips.component';
import { MatIconModule } from '@angular/material/icon';

const decoration: NgModule = {
  declarations: [
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
    BrowserAnimationsModule,
    MatOptionModule
  ]
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('allergen', () => ({
    props: {} as Partial<ChipsComponent>,
    component: ChipsComponent,
    template: `
<app-chips  [entity]="'Alergen'" [removable]="true">;
`
  }));
storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('allergen-no-del', () => ({
    props: {} as Partial<ChipsComponent>,
    component: ChipsComponent,
    template: `
<app-chips [entity]="'Alergen'" [removable]="false">;
`
  }));

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('hash', () => ({
    props: {} as Partial<ChipsComponent>,
    component: ChipsComponent,
    template: `
<app-chips  [entity]="'Tag'" [removable]="true">;
`
  }));
storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('hash-no-del', () => ({
    props: {} as Partial<ChipsComponent>,
    component: ChipsComponent,
    template: `
<app-chips [entity]="'Tag'" [removable]="false">;
`
  }));
