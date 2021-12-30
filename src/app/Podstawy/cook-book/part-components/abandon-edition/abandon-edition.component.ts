import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abandon-edition',
  templateUrl: './abandon-edition.component.html',
  styleUrls: ['./abandon-edition.component.scss']
})
export class AbandonEditionComponent implements OnInit {
  @Output() go = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
