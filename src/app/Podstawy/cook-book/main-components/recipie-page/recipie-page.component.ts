import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipie-page',
  templateUrl: './recipie-page.component.html',
  styleUrls: ['./recipie-page.component.scss']
})
export class RecipiePageComponent implements OnInit {
  @Input() edit = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
