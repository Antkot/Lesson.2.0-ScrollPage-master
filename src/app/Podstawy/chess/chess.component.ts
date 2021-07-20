import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChessInstance, Square } from 'chess.js';
import { combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragStart } from '@angular/cdk/drag-drop';

declare var require;
const Chess = require('chess.js');


// @HostListener('window:resize', ['$event']);
// onresize(event){
//   this.innerWidth = window.innerWidth;
// }


class Tiles {
  letter: string;
  numeric: string;
  color: string;
  figure: string;
  figureColor: string;
  toMove: boolean;
}


@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  tiles: Array<Tiles> = [];
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
  savedPosition = null;
  public innerWidth: any;
  public innerHeight: any;
  @ViewChild('board') board: ElementRef<HTMLElement>;
  firstPosition: number = null;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;


    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.pipe(debounceTime(10)).subscribe(evt => {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
    });

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
    this.draw();
  }

  move(i: number) {
    console.log('funkcja move odpalona dla: ', i);
    const to = `${this.tiles[i].letter.toLowerCase()}${this.tiles[i].numeric}` as Square;
    if (this.selected) {
      // const available = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
      const x = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
      // console.log('wykryto zaznaczenie');
      // if (this.tiles[i].figure === null || this.tiles[i].figureColor !== this.tiles[this.oldSelect].figureColor) {
      // console.log('wykonujemy ruch na puste pole');
      console.log('Ruch', this.game.move({ from: x, to, promotion: 'q' }));
      this.draw();
      this.oldSelect = null;
      this.selected = false;
      for (let h = 0; h < this.size * this.size; h++) {
        this.tiles[h].toMove = false;
      }
      this.draw();
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
      // this.selected = true;
      // this.oldSelect = i;
      // console.log('Poprawnie zaznaczono pole');
      // console.log('Dozwolone ruchy z tego pola', this.game.moves({ square: x }));
    }
  }

  drag(event: CdkDragStart, i) {
    for (let j = 0; j < this.size * this.size; j++) {
      this.tiles[j].toMove = false;
    }
    this.oldSelect = i;
    this.savedPosition = this.oldSelect;
    const available = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
    console.table(this.game.moves({ square: available }));
    for (let j = 0; j < this.size * this.size; j++) {
      const tileChecked = `${this.tiles[j].letter.toLowerCase()}${this.tiles[j].numeric}` as Square;
      this.game.moves({ square: available }).forEach(element => {
        if (element.indexOf(tileChecked) > -1) {
          this.tiles[j].toMove = true;
          console.log('Pole jest do ruszenia', tileChecked);
        }
      });
    }
  }


  drop(event) {
    const realValueX = (this.innerWidth - this.board.nativeElement.clientWidth) / 2;
    const realValueY = (this.innerHeight - this.board.nativeElement.clientHeight) / 2;
    const tileDimensions = this.board.nativeElement.offsetHeight / 8;
    fromEvent<MouseEvent>(window, 'mousemove').pipe(first()).subscribe(x => {
      console.log('szerokoóśc', x.x - realValueX);
      console.log('wysokość', x.y - realValueY);
      const positionX = x.x - realValueX;
      const positionY = x.y - realValueY;
      const axisX = Math.floor(positionX / tileDimensions);
      const axisY = Math.floor(positionY / tileDimensions);
      const i = this.size * axisY + axisX;
      console.log('Nowe pole: ', `${this.tiles[i].letter.toLowerCase()}${this.tiles[i].numeric}`);
      if (!(this.letters[axisX]) || !(this.numbers[axisY])) {
        console.log('error');
        event.source._dragRef.reset();
        return;
      }
      event.source._dragRef.reset();
      console.log(i);
      this.selected = true;
      this.move(i);
    });
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
