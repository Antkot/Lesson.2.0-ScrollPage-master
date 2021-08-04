import { NgModule } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { AddRecipeComponent } from './add-recipe.component';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from '@angular/cdk/drag-drop';

const decoration: NgModule = {
  declarations: [AddRecipeComponent],
  imports: [MatDividerModule, DragDropModule],
  providers: []
};

storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('view-recipe', () => ({
    props: {} as Partial<AddRecipeComponent>,
    component: AddRecipeComponent,
    template: `
 <ng-container *ngTemplateOutlet=""></ng-container>
<app-add-recipe [edit]="false">;
`
  }));
storiesOf('Podstawy / cook', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('add-recipe', () => ({
    props: {} as Partial<AddRecipeComponent>,
    component: AddRecipeComponent,
    template: `
 <ng-container *ngTemplateOutlet=""></ng-container>
<app-add-recipe [edit]="true">;
`
  }));
