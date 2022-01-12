import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent implements OnInit {

  lists: Array<any> = ['Lista 1', 'Lista inna'];
  constructor() { }

  ngOnInit(): void {
  }

}
