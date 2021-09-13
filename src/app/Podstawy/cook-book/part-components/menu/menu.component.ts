import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private router: any;

  constructor(public myRouter: Router) {
  }

  ngOnInit(): void {
  }

  redirectTo(uri: string) {
    this.myRouter.navigateByUrl('/main', { skipLocationChange: true }).then(() =>
      this.myRouter.navigate([uri]));
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    //   this.router.navigate([uri]));
    console.log('REDIRECTING>>>');
  }
}
