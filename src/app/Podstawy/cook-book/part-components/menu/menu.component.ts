import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public myRouter: Router) {
  }

  ngOnInit(): void {
  }

  redirectTo() {
    this.myRouter.navigate(['../recipe/new'], { state: { edit: true, reset: true } });
  }
}
