import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { number } from '@storybook/addon-knobs';

@Component({
  selector: 'app-photo-geometry',
  templateUrl: './photo-geometry.component.html',
  styleUrls: ['./photo-geometry.component.scss']
})
export class PhotoGeometryComponent implements OnInit {
  @Input() photo = '';
  @Input() x = '';
  @Input() y = '';
  @Input() widthScreen = null;
  @Input() heightScreen = null;
  css$ = new BehaviorSubject({});
  photo$ = new BehaviorSubject({});
  css = '';
  @ViewChild('img') img: ElementRef<HTMLElement>;
  x2 = null;
  y2 = null;
  scaled = null;
  sideCut = 0;
  updownCut = 0;
  marginTop = 0;
  marginLeft = 0;

  constructor(private elRef: ElementRef<HTMLElement>
  ) {
  }

  ngOnInit() {
    this.check();
    this.css$.next({
      'width': `${this.widthScreen}px`,
      'height': `${this.heightScreen}px`
    });
    // this.elRef.nativeElement.
    // this.css$.next({
    //   'transform': `translate(${this.widthScreen}px, ${this.heightScreen}px) scale(${this.scalePhoto})`,
    // });

  }

  check() {
    fromEvent<MouseEvent>(window, 'mousedown').pipe(first()).subscribe(({ x, y }) => {
      // console.log('lewa:', x, 'góra:', y);
      // console.log('prawa:', this.img.nativeElement.offsetWidth - x, 'dół:', this.img.nativeElement.offsetHeight - y);
      if (this.img.nativeElement.offsetWidth - x < x) {
        this.x2 = this.img.nativeElement.offsetWidth - x;
      }
      if (this.img.nativeElement.offsetHeight - y < y) {
        this.y2 = this.img.nativeElement.offsetHeight - y;
      }
      const k = this.x2 / this.y2;
      const q = this.widthScreen / this.heightScreen;
      this.marginLeft = (-x + this.widthScreen / 2); // / k
      this.marginTop = (-y + this.heightScreen / 2); // / q
      // console.log('mniejszy poziom:', this.x2, 'mniejszy pion:', this.y2);
      console.log('skala k:', k);
      console.log('skala q:', q);
      if (k < q) {
        console.log('tniemy gora i dol');
        console.log('boki bez ciecia skalujemy z', 2 * this.y2, ' do ', this.heightScreen);
        console.log('Zostawiamy', k / q, '% wartości');
        this.scaled = q / k;
        // this.updownCut = ;
        // this.sideCut = ;
      } else if (k > q) {
        console.log('tniemy boki');
        console.log('gora i dol bez ciecia skalujemy z', 2 * this.x2, ' do ', this.widthScreen);
        console.log('Zostawiamy', q / k, '% wartości');
        this.scaled = k / q;
        // this.updownCut = ;
        // this.sideCut = ;
      } else {
        this.scaled = 1;
        // this.updownCut = 0;
        // this.sideCut = 0;
        console.log('skale są takie same, nic nei tniemy');
      }
    });

    // console.log(this.marginLeft, 'left');
    console.log(this.marginTop, 'top');
    console.log(this.scaled, 'to skala');

    this.photo$.next({
      'transform': `scale(${this.scaled}) translate(${this.marginLeft}px, ${this.marginTop}px)`,
      // 'transform': `translate(${this.marginLeft}px, ${this.marginTop}px)`,
      // 'transform': `scale(${this.scaled})`,
      // 'transform': ` translate(${this.sideCut}px, ${this.updownCut}px)`,
      // 'margin-top': `${this.marginTop}px`,
      // 'margin-left': `-${this.marginLeft}px`,
      'width': `${this.x}px`,
      'height': `${this.y}px`
      // 'width': `${this.widthScreen}px`,
      // 'height': `${this.heightScreen}px`,
      // 'object-fit': `cover`
    });
  }
}
