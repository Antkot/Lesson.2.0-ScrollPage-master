import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.scss']
})
export class IngredientDialogComponent implements OnInit {
  // measures$ =
  @Input() name = 'Kuba';
  @Output() button = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
