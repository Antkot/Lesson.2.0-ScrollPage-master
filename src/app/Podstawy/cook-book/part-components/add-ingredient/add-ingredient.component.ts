import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hashes, Measures } from '../../types';
import { Observable } from 'rxjs';
import { MeasuresStorageService } from '../services/measures-storage.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(IngredientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: 'ingredient-dialog.html',
})
export class IngredientDialogComponent {
  constructor(private measureService: MeasuresStorageService) { }

  measures$: Observable<Array<Measures>> = this.measureService.measures$;

}
