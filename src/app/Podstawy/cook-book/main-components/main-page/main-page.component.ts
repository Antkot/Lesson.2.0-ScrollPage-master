import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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
  ) {
  }

  ngOnInit(): void {
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
  }

}
