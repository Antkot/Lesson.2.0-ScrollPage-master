import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  tiles: Array<{ letter: string, numeric: string, color: string, figure: string }> = [];
  size = 8;
  numbers: Array<number> = [8, 7, 6, 5, 4, 3, 2, 1];
  letters: Array<string> = [];

  constructor() {
  }

  ngOnInit(): void {
    for (let x = 65; x < 65 + this.size; x++) {
      this.letters.push(String.fromCharCode(x));
    }
    console.log('witam');
    console.table(this.letters);

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (i % 2 === 0 && j % 2 !== 0 || (i % 2 !== 0 && j % 2 === 0)) {
          this.tiles.push({ letter: String(this.letters[j]), numeric: String(this.numbers[i]), color: 'black', figure: 'null' });
        } else {
          this.tiles.push({ letter: String(this.letters[j]), numeric: String(this.numbers[i]), color: 'white', figure: 'null' });
        }
      }
    }
    const objIndex = this.tiles.findIndex((obj => obj.figure === 'null'));
    this.tiles[objIndex].figure = 'Chess_rdt45.svg';
    this.tiles[1].figure = 'Chess_ndt45.svg';
    this.tiles[2].figure = 'Chess_bdt45.svg';
    this.tiles[5].figure = 'Chess_bdt45.svg';
    this.tiles[6].figure = 'Chess_ndt45.svg';
    this.tiles[7].figure = 'Chess_ndt45.svg';
    // this.tiles.map((value, index) => value.number === '7');


    this.tiles.map(({ letter, numeric, color, figure }) => ({ letter, numeric, color, figure: numeric === '7' ? 'Chess_pdt45.svg' : null }));

    // for(let i = 0; i<this.size; i++){
    //
    // }

    // const current = this.tiles;
    // this.tiles.next({
    //   letter: current.letter,
    //   number: current.number,
    //   color: current.color,
    //   figure: []
    // });

  }


}
