import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  buttons = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '/', 'del', '0', 'C', '*', '='];
  screen = '';
  digitOne = '';
  digitTwo = '';
  sign = '';
  counted = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.buttons);
  }

  buttonUse(button: string) {
    console.log('kliknięto', button);
    if (['/', '*', '+', '-', 'del', 'C', '='].indexOf(button) !== -1) {
      switch (button) {
        case 'del':
          this.screen = this.screen.substr(0, this.screen.length - 1);
          this.sign = '';
          break;
        case 'C':
          this.screen = '';
          this.digitOne = '';
          this.digitTwo = '';
          this.sign = '';
          this.counted = false;
          break;
        case '=':
          this.countMe(button);
          break;
        default:
          this.screen = '';
          if (this.sign) {
            this.countMe(button);
          }
          this.sign = button;
          break;
      }
    } else {
      if (this.sign === '') {
        this.digitOne += button;
        this.screen = this.digitOne;
      } else {
        if (this.counted === true) {
          this.digitTwo = '';
          this.sign = '';
          this.counted = false;
          this.digitOne = button;
          this.screen = this.digitOne;
        }else{
          this.digitTwo += button;
          this.screen = this.digitTwo;
        }
      }
    }
    console.log(' digitOne: ', this.digitOne, '\n', 'sign: ', this.sign, '\n', 'digitTwo: ', this.digitTwo, '\n', 'counted: ', this.counted);
  }

  countMe(button: string) {
    if (this.counted === false || button === '=') {
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
          break;
      }
      this.screen = this.digitOne;

      button === '=' ? this.counted = true : this.counted = false;
    } else {
      this.counted = false;
    }
    if (button !== '=') {
      this.digitTwo = '';
    }
  }
}

