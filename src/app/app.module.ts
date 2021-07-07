import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToDoListComponent } from './Podstawy/to-do-list/to-do-list.component';
import { CalculatorComponent } from './Podstawy/Calculator/calculator.component';
import { TicTacToeComponent } from './Podstawy/tic-tac-toe/tic-tac-toe.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ChessComponent } from './Podstawy/chess/chess.component';
import { AaaPipe } from './Podstawy/chess/aaa.pipe';

const links = [
  {
    component: TicTacToeComponent,
    path: 'ticTacToe'
  },
  {
    component: CalculatorComponent,
    path: 'calculator'
  },
  {
    component: ToDoListComponent,
    path: 'todo/:tableId',
  }
];

@NgModule({
  declarations: [
    ToDoListComponent,
    CalculatorComponent,
    TicTacToeComponent,
    ChessComponent,
    AaaPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(links, { useHash: true }),
    BrowserAnimationsModule, ReactiveFormsModule, FormsModule,
    MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatListModule, MatIconModule, MatMenuModule, MatDialogModule, MatButtonToggleModule

  ],
  exports: [
    ToDoListComponent,
    CalculatorComponent,
    TicTacToeComponent,
    ChessComponent,
    AaaPipe]
})
export class AppModule {
}
