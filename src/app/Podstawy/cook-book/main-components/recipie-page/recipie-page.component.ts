import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipie-page',
  templateUrl: './recipie-page.component.html',
  styleUrls: ['./recipie-page.component.scss']
})
export class RecipiePageComponent implements OnInit {
  edit = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  change() {
    this.edit = !this.edit;
  }
}
