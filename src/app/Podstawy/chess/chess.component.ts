import { Component, OnInit } from '@angular/core';
import { ChessInstance } from 'chess.js';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  tiles: Array<{ letter: string, numeric: string, color: string, figure: string, figureColor: string, toMove: boolean }> = [];
  size = 8;
  numbers: Array<number> = [8, 7, 6, 5, 4, 3, 2, 1];
  letters: Array<string> = [];
  figures: Array<string> = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  selected = false;
  movedFigure = null;
  movedFigureColor = null;
  oldSelect = null;

  constructor() {
  }
  //szachy biblioteka
  // game: ChessInstance = new Chess();

  ngOnInit(): void {
    for (let x = 65; x < 65 + this.size; x++) {
      this.letters.push(String.fromCharCode(x));
    }
    console.log('witam');

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (i % 2 === 0 && j % 2 !== 0 || (i % 2 !== 0 && j % 2 === 0)) {
          this.tiles.push({
            letter: String(this.letters[j]),
            numeric: String(this.numbers[i]),
            color: 'black',
            figure: 'null',
            figureColor: 'null',
            toMove: false
          });
        } else {
          this.tiles.push({
            letter: String(this.letters[j]),
            numeric: String(this.numbers[i]),
            color: 'white',
            figure: 'null',
            figureColor: 'null',
            toMove: false
          });
        }
      }
    }
    // const objIndex = this.tiles.findIndex((obj => obj.figure === 'null'));
    // this.tiles[objIndex].figure = 'Chess_rdt45.svg';
    for (let i = 0; i < this.size; i++) {
      this.tiles[i].figure = 'Chess_' + this.figures[i] + 'dt45.svg';
      this.tiles[i].figureColor = 'black';
    }
    for (let i = 0; i < this.size; i++) {
      this.tiles[i + 56].figure = 'Chess_' + this.figures[i] + 'lt45.svg';
      this.tiles[i + 56].figureColor = 'white';
    }

    // for (let x = 0; x < this.size * this.size; x++) {
    //   if (this.tiles[x].numeric === '1') {
    //     this.tiles[x].figure = 'Chess_' + this.figures[x] + 'lt45.svg';
    //     this.tiles[x].figureColor = 'white';
    //   }
    // }


    for (let i = 8; i < this.size + 8; i++) {
      this.tiles[i].figure = 'Chess_pdt45.svg';
      this.tiles[i].figureColor = 'black';
    }


    for (let x = 0; x < this.size * this.size; x++) {
      if (this.tiles[x].numeric === '2') {
        this.tiles[x].figure = 'Chess_plt45.svg';
        this.tiles[x].figureColor = 'white';
      }
    }

    console.table(this.tiles);

    // const current = this.tiles;
    // this.tiles.next({
    //   letter: current.letter,
    //   number: current.number,
    //   color: current.color,
    //   figure: []
    // });

  }

  move(i: number) {
    console.log('KLIKNIĘTO');
    if (this.selected) {
      console.log('Teraz wykonamy ruch');
      console.log('Czy pole ma inny kolor niż figura? ', this.tiles[i].figureColor !== this.movedFigureColor);
      // TUTAJ RUSZANIE FIGUR
      if ((this.tiles[i].figure === 'null' || this.tiles[i].figureColor !== this.movedFigureColor) && this.tiles[i].toMove === true) {
        // if (this.tiles[i].figure === 'null' || this.tiles[i].figureColor !== this.movedFigureColor) {
        this.tiles[this.oldSelect].figure = 'null';
        this.tiles[this.oldSelect].figureColor = 'null';
        this.tiles[i].figure = this.movedFigure;
        this.tiles[i].figureColor = this.movedFigureColor;
      }
      this.oldSelect = null;
      this.selected = false;
      for (let x = 0; x < this.size * this.size; x++) {
        this.tiles[x].toMove = false;
      }
    } else {
      if (this.tiles[i].figure === 'null') {
        console.log('To puste pole!');
        return;
      }
      console.log('Teraz zaznaczono figurę');
      this.movedFigure = this.tiles[i].figure;
      this.movedFigureColor = this.tiles[i].figureColor;
      this.selected = true;
      this.oldSelect = i;
      for (let x = 0; x < this.size * this.size; x++) {
        //wieża zrobić case dla figur
        if (this.movedFigure.includes('r')) {
          if (
            (this.tiles[i].numeric === this.tiles[x].numeric || this.tiles[i].letter === this.tiles[x].letter)
            && !(this.tiles[i].numeric === this.tiles[x].numeric && this.tiles[i].letter === this.tiles[x].letter)
            && this.tiles[x].figureColor !== this.movedFigureColor
          ) {
            this.tiles[x].toMove = true;
          }
        }
      }
    }
  }
}

/**
 * centrowanie obrazków figur
 * ruchy figur
 * warunek zwycięstwa
 * gracz
 */
