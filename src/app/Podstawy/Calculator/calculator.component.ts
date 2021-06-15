import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {combineLatest, fromEvent, Observable} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';

@Component({
  selector: 'app-calc',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  buttons = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '/', 'del', '0', 'C', '*', '.', '+/-', '='];
  screen = '';
  digitOne = '';
  digitTwo = '';
  sign = '';
  counted = false;
  readyToClean = false;
  @ViewChild('observed') observed: ElementRef;
  observable$: Observable<number> = fromEvent(window, 'resize').pipe(
    map((value) => {
      console.table(1111111111);
      console.table(this.observed.nativeElement.offsetWidth);
      let signLimit = this.observed.nativeElement.offsetWidth / 17.88;
      if (signLimit === null) {
        signLimit = 17;
      }
      return signLimit;
    })
  );
  load$ = fromEvent(window, 'loadend');
  move$ = combineLatest([this.observable$, this.load$]).pipe(
    map(([observable, load]) => {
      console.log('strumyczek move działa');
      return !observable ? 17 : observable;
    })
  );

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.buttons);
  }

  buttonUse(button: string) {
    this.move$.pipe(first()).subscribe((signLimit) => {
      console.log(1111, signLimit);
      if (this.readyToClean) {
        this.clean();
      }
      console.log('kliknięto', button);
      if (['/', '*', '+', '-', 'del', 'C', '+/-', '='].indexOf(button) !== -1) {
        switch (button) {
          case 'del':
            if (this.digitTwo !== '' && !this.counted) {
              this.digitTwo = this.digitTwo.substr(0, this.screen.length - 1);
              this.screen = this.digitTwo;
            } else {
              this.digitOne = this.digitOne.substr(0, this.screen.length - 1);
              this.screen = this.digitOne;
            }
            break;
          case 'C':
            this.clean();
            break;
          case '=':
            this.countMe(button);
            break;
          case '+/-':
            if (this.sign === '' || this.counted) {
              this.digitOne = String(-Number(this.digitOne));
              this.screen = this.digitOne;
              return;
            } else {
              this.digitTwo = String(-Number(this.digitTwo));
              this.screen = this.digitTwo;
            }
            break;
          default:
            this.screen = this.digitOne;
            if (this.sign) {
              this.countMe(button);
            }
            if (this.digitOne !== '') {
              this.sign = button;
            } else {
              // this.screen = 'wprowadź liczbę';
            }
            break;
        }
      } else {
        if (button === '.') {
          if (this.counted || this.digitTwo === '') {
            if (this.digitOne.includes('.')) {
              return;
            }
            this.digitOne += button;
            this.screen = this.digitOne;
          } else {
            if (this.digitTwo.includes('.')) {
              return;
            }
            this.digitTwo += button;
            this.screen = this.digitTwo;
          }
          return;
        }
        if (this.sign === '') {
          if (this.digitOne.length > signLimit) {
            this.screen = 'Za dużo cyfr, wybierz znak działania';
            return;
          }
          this.digitOne += button;
          this.screen = this.digitOne;
        } else {
          if (this.counted) {
            this.digitTwo = '';
            this.sign = '';
            this.counted = false;
            this.digitOne = button;
            this.screen = this.digitOne;
          } else {
            if (this.digitTwo.length > signLimit) {
              this.screen = 'Za dużo cyfr, wybierz znak działania';
              return;
            }
            this.digitTwo += button;
            this.screen = this.digitTwo;
          }
        }
      }
      console.log(' digitOne: ', this.digitOne,
        '\n', 'sign: ', this.sign,
        '\n', 'digitTwo: ', this.digitTwo,
        '\n', 'counted: ', this.counted);
    });
  }

  countMe(button: string) {
    if (!this.counted || button === '=') {
      if (!this.digitTwo) {
        return;
      }
      switch (this.sign) {
        case '+':
          this.digitOne = String(Number(this.digitOne) + Number(this.digitTwo));
          break;
        case '-':
          this.digitOne = String(Number(this.digitOne) - Number(this.digitTwo));
          break;
        case '*':
          this.digitOne = String(Number(this.digitOne) * Number(this.digitTwo));
          break;
        case '/':
          this.digitOne = String(Number(this.digitOne) / Number(this.digitTwo));
          if (this.digitOne === '-Infinity' || this.digitOne === 'Infinity' || this.digitOne === 'NaN') {
            this.screen = 'Nie dziel przez zero';
            this.readyToClean = true;
            return;
          }
          break;
      }
      this.counted = button === '=';
      this.move$.pipe(first()).subscribe((signLimit) => {
        if (this.digitOne.length > signLimit) {
          console.log(11111, this.digitOne.length);
          this.digitOne = this.digitOne.substr(0, signLimit);
          console.log(11112, this.digitOne.length);
        }
      });
      this.screen = this.digitOne;
    } else {
      this.counted = false;
    }
    if (button !== '=') {
      this.digitTwo = '';
    }
  }

  clean() {
    this.screen = '';
    this.digitOne = '';
    this.digitTwo = '';
    this.sign = '';
    this.counted = false;
    this.readyToClean = false;
  }

}

