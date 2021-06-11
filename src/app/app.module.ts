import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToDoListComponent } from './Podstawy/to-do-list/to-do-list.component';
import { CalculatorComponent } from './Podstawy/Calculator/calculator.component';


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    MatDialogModule, BrowserAnimationsModule, ReactiveFormsModule, FormsModule, DragDropModule,
    MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatListModule, MatIconModule, MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
