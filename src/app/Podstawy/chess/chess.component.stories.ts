import { moduleMetadata, storiesOf } from '@storybook/angular';
import { Component, NgModule, OnInit } from '@angular/core';
import { AppModule } from '../../app.module';
import { ChessComponent } from './chess.component';

@Component({
  selector: 'chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})

const decoration: NgModule = {
  declarations: [],
  imports: [AppModule],
  exports: []
};
//
storiesOf('Podstawy / Pierwsze kroki', module)
  .addDecorator(moduleMetadata(decoration))
  .add('chess', () => ({
    props: {} as Partial<ChessComponent>,
    component: ChessComponent
  }));

