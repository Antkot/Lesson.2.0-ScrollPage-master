import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
export class SorterComponent implements OnInit {
  selected = '';
  constructor() { }

  ngOnInit(): void {
  }

}

