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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectorPipe } from './Podstawy/chess/selector.pipe';
import { MovablePipe } from './Podstawy/chess/movable.pipe';
import { PhotoGeometryComponent } from './Podstawy/photo-geometry/photo-geometry.component';
import { CookBookModule } from './Podstawy/cook-book/cook-book.module';
import { IngredientDialogComponent } from './Podstawy/cook-book/part-components/add-ingredient/add-ingredient.component';

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
    path: 'todo/:tableId'
  },
  {
    component: PhotoGeometryComponent,
    path: 'PhotoGeometryComponent'
  }
];

@NgModule({
  declarations: [
    ToDoListComponent,
    CalculatorComponent,
    TicTacToeComponent,
    ChessComponent,
    AaaPipe,
    SelectorPipe,
    MovablePipe,
    PhotoGeometryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(links, { useHash: true }),
    BrowserAnimationsModule, ReactiveFormsModule, FormsModule,
    MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatListModule, MatIconModule, MatMenuModule, MatDialogModule, MatButtonToggleModule,
    DragDropModule
  ],
  exports: [
    ToDoListComponent,
    CalculatorComponent,
    TicTacToeComponent,
    ChessComponent,
    PhotoGeometryComponent,
    AaaPipe,
    SelectorPipe
  ]
})
export class AppModule {
}
