import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../part-components/services/loading.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  lastLink$ = this.loadingService.lastLink$;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private myRouter: Router
  ) {
  }

  ngOnInit(): void {
  }

  redirect() {
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
    console.log('Zmieniono ostatni link. Teraz to: ');
    this.lastLink$.pipe(first()).subscribe(value => console.log(value));
    this.myRouter.navigate(['../list']);
  }

  redirectTo() {
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
    console.log('Zmieniono ostatni link. Teraz to: ');
    this.lastLink$.pipe(first()).subscribe(value => console.log(value));
    this.myRouter.navigate(['/menu']);
  }
}
