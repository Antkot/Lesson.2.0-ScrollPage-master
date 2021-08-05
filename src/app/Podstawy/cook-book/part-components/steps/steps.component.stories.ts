import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StepsComponent } from './steps.component';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

const decoration: NgModule = {
  declarations: [StepsComponent],
  imports: [BrowserAnimationsModule, MatDividerModule, DragDropModule, MatIconModule, MatMenuModule, MatInputModule],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('stepView', () => ({
    props: {} as Partial<StepsComponent>,
    component: StepsComponent,
    template: `
<app-steps [edit]="false">;
`
  }));
storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('stepEdit', () => ({
    props: {} as Partial<StepsComponent>,
    component: StepsComponent,
    template: `
<app-steps [edit]="true">;
`
  }));
