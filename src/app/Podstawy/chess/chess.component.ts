import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { sign } from 'crypto';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  tiles: Array<{ sign: string }> = [];
  size = 8;
  numbers: Array<number> = [8, 7, 6, 5, 4, 3, 2, 1];
  letters: Array<string> = [];

  // StringfromCharCode


  constructor() {
  }

  ngOnInit(): void {
    for (let x = 64; x < 65 + this.size; x++) {
      this.letters.push(String.fromCharCode(x));
    }
    console.log('witam');
    console.table(this.letters);

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.tiles.push({ sign: String(i) + '.' +String(j) });
      }
    }

    // for (let i = 0; i < this.size; i++) {
    //   for (let j = 0; j < this.size; j++) {
    //     if ((i === 0 || i === this.size - 1) && j + 1 !== this.size && j !== 0) {
    //       this.tiles.push({ sign: this.letters[j] });
    //     } else if ((j === 0 || j === this.size - 1) && i + 1 !== this.size && i !== 0) {
    //         this.tiles.push({ sign: String(this.numbers[i-1]) });
    //     } else {
    //       this.tiles.push({ sign: null });
    //       // this.tiles.push({ sign: 'X' });
    //     }
    //   }
    // }

  }


}
