import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  lastLink$ = this.loadingService.lastLink$;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    ) {
  }

  getUrl() {
    this.route.url.pipe(
      map(value => value[0].path)).pipe(first()).subscribe(url => this.lastLink$.next(url)
    );
  }

}
