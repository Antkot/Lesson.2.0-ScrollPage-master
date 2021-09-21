import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hash, Measure, Product } from '../../types';
import { Observable } from 'rxjs';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { MainPageComponent } from '../../main-components/main-page/main-page.component';
import { first, takeUntil } from 'rxjs/operators';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';
import { MainMenuComponent } from '../../main-components/main-menu/main-menu.component';
import { ChipsComponent } from '../chips/chips.component';
import { RecipiePageComponent } from '../../main-components/recipie-page/recipie-page.component';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent {

  constructor(public dialog: MatDialog) {
  }

  @Output() addProduct = new EventEmitter();

  openDialog() {
    const dialogRef = this.dialog.open(IngredientDialogComponent);
    // const dialogRef = this.dialog.open(MainPageComponent);
    // dialogRef.componentInstance.name = 'Franek';
    // dialogRef.componentInstance.button.pipe(takeUntil(dialogRef.afterClosed())).subscribe(
    //   (value) => {
    //     dialogRef.close();
    //   }
    // );
    dialogRef.componentInstance.addProduct.pipe(first()).subscribe((result) => {
      console.log('Dialog result:');
      console.table(result);
      this.addProduct.emit(result);
    });
    dialogRef.componentInstance.close.pipe(takeUntil(dialogRef.afterClosed())).subscribe(() => {
      dialogRef.close();
    });
  }
}
