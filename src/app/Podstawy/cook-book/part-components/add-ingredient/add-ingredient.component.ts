import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hashes, Measures } from '../../types';
import { Observable } from 'rxjs';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { MainPageComponent } from '../../main-components/main-page/main-page.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss']
})
export class AddIngredientComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(MainPageComponent);
    dialogRef.componentInstance.name = 'Franek';
    dialogRef.componentInstance.button.pipe(takeUntil(dialogRef.afterClosed())).subscribe(
      (value) => {
        dialogRef.close();
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: 'ingredient-dialog.html'
})
export class IngredientDialogComponent {
  constructor(private measureService: MeasuresStorageService) {
  }

  measures$: Observable<Array<Measures>> = this.measureService.measures$;

}
