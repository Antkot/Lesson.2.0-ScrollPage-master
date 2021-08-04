import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StepsComponent } from './steps.component';
import { MatIconModule } from '@angular/material/icon';

const decoration: NgModule = {
  declarations: [StepsComponent],
  imports: [MatDividerModule, DragDropModule, MatIconModule],
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
