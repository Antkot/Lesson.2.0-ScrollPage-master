import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent implements OnInit {

  lists: Array<any> = ['Lista 1', 'Lista 2'];

  constructor() {
  }

  ngOnInit(): void {
  }

  add() {
    this.lists.push(`lista ${ this.lists.length + 1 }`);
  }

}
