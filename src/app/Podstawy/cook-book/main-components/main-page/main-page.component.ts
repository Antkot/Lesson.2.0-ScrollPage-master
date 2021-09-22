import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  @Input() name = 'Kuba';
  @Output() button = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    // console.log(1111, this.name);
  }

}
