import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
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


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    CalculatorComponent,
    TicTacToeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    MatDialogModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule, DragDropModule,
    MatButtonModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatListModule, MatIconModule, MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
