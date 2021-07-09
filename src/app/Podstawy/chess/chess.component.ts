import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChessInstance, Square } from 'chess.js';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


declare var require;
const Chess = require('chess.js');


// @HostListener('window:resize', ['$event']);
// onresize(event){
//   this.innerWidth = window.innerWidth;
// }

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
  game: ChessInstance = new Chess();
  @ViewChild('winner') winner: any;

  public innerWidth: any;
  public innerHeight: any;


  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;


    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.pipe(debounceTime(10)).subscribe(evt => {
      // console.log('event: ', evt);
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
    });

    // this.draw();
    for (let x = 65; x < 65 + this.size; x++) {
      this.letters.push(String.fromCharCode(x));
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const color = i % 2 === 0 && j % 2 !== 0 || (i % 2 !== 0 && j % 2 === 0) ? 'black' : 'white';
        this.tiles.push({
          letter: String(this.letters[j]),
          numeric: String(this.numbers[i]),
          color,
          figure: null,
          figureColor: null,
          toMove: false
        });
      }
    }
    for (let i = 0; i < this.size; i++) {
      this.tiles[i].figure = 'Chess_' + this.figures[i] + 'bt45.svg';
      this.tiles[i].figureColor = 'black';
      this.tiles[i + 56].figure = 'Chess_' + this.figures[i] + 'wt45.svg';
      this.tiles[i + 56].figureColor = 'white';
    }

    for (let i = 8; i < this.size + 8; i++) {
      this.tiles[i].figure = 'Chess_pbt45.svg';
      this.tiles[i].figureColor = 'b';
    }
    for (let x = 0; x < this.size * this.size; x++) {
      if (this.tiles[x].numeric === '2') {
        this.tiles[x].figure = 'Chess_pwt45.svg';
        this.tiles[x].figureColor = 'w';
      }
    }
  }

  move(i: number) {
    if (this.selected) {
      const x = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
      const to = `${this.tiles[i].letter.toLowerCase()}${this.tiles[i].numeric}` as Square;
      console.log('Dozwolone ruchy z tego pola', this.game.moves({ square: x }));
      console.log('Ruch', this.game.move({ from: x, to, promotion: 'q' }));
      // if ((this.tiles[i].figure === null || this.tiles[i].figureColor !== this.movedFigureColor) && this.tiles[i].toMove === true) {
      //   this.tiles[this.oldSelect].figure = null;
      //   this.tiles[this.oldSelect].figureColor = null;
      //   this.tiles[i].figure = this.movedFigure;
      //   this.tiles[i].figureColor = this.movedFigureColor;
      // }
      console.log('Dane', x, to);         // dobre dane
      this.oldSelect = null;
      this.selected = false;
      for (let i = 0; i < this.size * this.size; i++) {
        this.tiles[i].toMove = false;
      }
      this.draw();
      console.log(this.game.game_over());
      console.log(this.game.turn());          // dobre dane


        if (this.game.in_check()) {
          this.dialog.open(this.winner);
        }
        if (this.game.in_checkmate()) {
          this.dialog.open(this.winner);
        }
        if (this.game.in_draw()) {
          this.dialog.open(this.winner);
      }
    } else {
      if (this.tiles[i].figure === null) {
        return;
      }
      // this.movedFigure = this.tiles[i].figure;
      // this.movedFigureColor = this.tiles[i].figureColor;
      this.selected = true;
      this.oldSelect = i;
      //  movable jeśli się zawiera w możlwiych ruchach
      const available = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
      console.log(this.game.moves({ square: available }).includes('jakieś tam pole'));

    }
  }

  draw() {
    const tableBoard = (this.game.board());
    for (let i = 0; i < this.size; i++) {
      for (let x = 0; x < this.size; x++) {
        if (!!tableBoard[i][x]) {
          this.tiles[8 * i + x].figureColor = tableBoard[i]?.[x].color;
          this.tiles[8 * i + x].figure = 'Chess_' + String(tableBoard[i]?.[x].type) + tableBoard[i]?.[x].color + 't45.svg';
        } else {
          this.tiles[8 * i + x].figureColor = null;
          this.tiles[8 * i + x].figure = null;
        }
      }
    }
  }
}

// ngOnDestroy(): void {
//   this.resizeSubscription$.unsubscribe()
// }

/** angular material drag and drop
 *
 */
