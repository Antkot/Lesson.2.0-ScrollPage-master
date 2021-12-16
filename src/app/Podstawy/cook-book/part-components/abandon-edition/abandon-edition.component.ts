import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abandon-edition',
  templateUrl: './abandon-edition.component.html',
  styleUrls: ['./abandon-edition.component.scss']
})
export class AbandonEditionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AbandonEditionComponent>) {
  }

  ngOnInit(): void {
  }

  go() {
    this.dialogRef.close(true);
  }

  goBack() {
    this.dialogRef.close(false);
  }
}
