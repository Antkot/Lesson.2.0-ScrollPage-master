import { moduleMetadata, storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs';
import { PhotoGeometryComponent } from './photo-geometry.component';


const decoration: NgModule = {
  declarations: [PhotoGeometryComponent],
  imports: [],
  providers: []
};

storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .addDecorator(withKnobs)
  .add('zdjecie', () => ({
    props: {} as Partial<PhotoGeometryComponent>,
    component: PhotoGeometryComponent,
    template: `
    <app-photo-geometry x="1051" y="701" widthScreen="300" heightScreen="300"
    photo="https://images.unsplash.com/photo-1590450175122-945cfdd0b2a6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"></app-photo-geometry>
`
  }))
  .add('zdjecie2', () => ({
    props: {} as Partial<PhotoGeometryComponent>,
    component: PhotoGeometryComponent,
    template: `
    <app-photo-geometry x="701" y="876" widthScreen="300" heightScreen="300"
    photo="https://images.unsplash.com/photo-1584526083071-fd4129b92514?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=701&q=80"></app-photo-geometry>

`
  }));

