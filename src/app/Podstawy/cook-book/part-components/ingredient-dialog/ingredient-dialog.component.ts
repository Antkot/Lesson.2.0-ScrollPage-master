import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MeasuresStorageService } from '../services/measures-storage.service';
import { Measure } from '../../types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  measures$: Observable<Array<Measure>> = this.measureService.measures$;
  @Input() name = 'Kuba';
  @Output() button = new EventEmitter();

  constructor(private measureService: MeasuresStorageService) { }

  ngOnInit(): void {
  }

}
