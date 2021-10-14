import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { IngredientDialogComponent } from '../ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent {

  constructor(public dialog: MatDialog) {
  }

  @Output() addProduct = new EventEmitter();
  @Output() prodMeasureDeleted = new EventEmitter();

  openDialog() {
    const dialogRef = this.dialog.open(IngredientDialogComponent, { panelClass: 'dialog-container-custom' });
    dialogRef.componentInstance.addProduct.pipe(takeUntil(dialogRef.afterClosed())).subscribe((result: {duplicateState: boolean, product: { product: string, measure: string, kcal: number, allergens: Array<string> }}) => {
      console.log('Dialog result:');
      console.table(result);
      this.addProduct.emit(result);
    });
    dialogRef.componentInstance.prodMeasureDeleted.pipe(takeUntil(dialogRef.afterClosed())).subscribe((result: { givenMeasureId: string, givenProductId: string }) => {
      console.table(result);
      this.prodMeasureDeleted.emit(result);
    });
    dialogRef.componentInstance.close.pipe(takeUntil(dialogRef.afterClosed())).subscribe(() => {
      dialogRef.close();
    });
  }
}
