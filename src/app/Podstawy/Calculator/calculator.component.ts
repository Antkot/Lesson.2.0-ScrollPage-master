import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  buttons = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '/', 'del', '0', 'C', '*', '.', '='];
  screen = '';
  digitOne = '';
  digitTwo = '';
  sign = '';
  counted = false;
  readyToClean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.buttons);
  }

  buttonUse(button: string) {
    if (this.readyToClean) {
      this.clean();
    }
    console.log('kliknięto', button);
    if (['/', '*', '+', '-', 'del', 'C', '='].indexOf(button) !== -1) {
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
        default:
          if (this.digitOne === '' && button === '-') {
            this.digitOne += button;
            this.screen = this.digitOne;
            return;
          }
          this.screen = this.digitOne;
          if (this.sign) {
            this.countMe(button);
          }
          this.sign = button;
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
        if (this.digitOne.length > 15) {
          this.screen = 'Za długa liczba';
          this.readyToClean = true;
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
          this.digitTwo += button;
          this.screen = this.digitTwo;
        }
      }
    }
    console.log(' digitOne: ', this.digitOne,
      '\n', 'sign: ', this.sign,
      '\n', 'digitTwo: ', this.digitTwo,
      '\n', 'counted: ', this.counted);
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
      this.screen = this.digitOne;
      this.counted = button === '=';
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

