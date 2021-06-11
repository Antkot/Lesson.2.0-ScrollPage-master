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
  deletable = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.buttons);
  }

  buttonUse(button: string) {
    // this.deleteCheck();
    if (['/', '*', '+', '-', 'del', 'C', '='].indexOf(button) !== -1) {
      console.log('Kliknąłeś znak', button);
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
          break;
        case '=':
          this.signCheck();
          break;
        default:
          this.signCheck();
          this.sign = button;
          // this.digitTwo = '';
          break;
      }
    } else {
      console.log('Kliknąłeś liczbę', button);
      this.sign === '' ? this.digitOne += button : this.digitTwo += button;
      this.screen += button;
      console.log('długość b i znaku: ', this.digitTwo.length, this.sign.length);
      // this.deleteCheck();
      // ((this.digitTwo.length === 0 || this.digitTwo.length === 0) && this.sign.length !== 0) ? this.screen = this.digitOne : this.screen = this.digitTwo;
    }
    console.log('a: ', this.digitOne, 'znak:', this.sign, 'b: ', this.digitTwo);
  }

  signCheck() {
    switch (this.sign) {
      case '+':
        this.screen = String(Number(this.digitOne) + Number(this.digitTwo));
        this.digitOne = String(Number(this.digitOne) + Number(this.digitTwo));
        console.log('wykonano dodawanie', this.digitOne);
        break;
      case '-':
        this.screen = String(Number(this.digitOne) - Number(this.digitTwo));
        this.digitOne = String(Number(this.digitOne) - Number(this.digitTwo));
        console.log('wykonano odejmowanie', this.digitOne);
        break;
      case '*':
        this.screen = String(Number(this.digitOne) * Number(this.digitTwo));
        this.digitOne = String(Number(this.digitOne) * Number(this.digitTwo));
        console.log('wykonano mnożenie', this.digitOne);
        break;
      case '/':
        this.screen = String(Number(this.digitOne) / Number(this.digitTwo));
        this.digitOne = String(Number(this.digitOne) / Number(this.digitTwo));
        console.log('wykonano dzielenie', this.digitOne);
        break;
      default:
        console.log('wykonano działanie bez znaku');
        // this.screen = this.digitOne;
        this.screen = '';
        break;
    }
    this.deletable = true;
    // this.deleteCheck();
  }

//   deleteCheck() {
//     if (this.deletable) {
//       this.deletable = false;
//       this.screen = '';
//     }
//   }
}

import { Component, OnInit } from '@angular/core';
