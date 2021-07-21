import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChessInstance, Square } from 'chess.js';
import { combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime, first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { element } from 'protractor';

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
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {

  tiles: Array<Tiles> = [];
  size = 8;
  numbers: Array<number> = [8, 7, 6, 5, 4, 3, 2, 1];
  letters: Array<string> = [];
  figures: Array<string> = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  selected = false;
  movedFigureColor = null;
  oldSelect = null;
  game: ChessInstance = new Chess();
  @ViewChild('winner') winner: any;
  savedPosition = null;
  public innerWidth: any;
  public innerHeight: any;
  @ViewChild('board') board: ElementRef<HTMLElement>;
  moveTo: number = null;
  positionX = null;
  positionY = null;


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
    this.newGame();
  }

  move(i: number) {
    this.movedFigureColor = this.tiles[i].figureColor;
    const to = `${this.tiles[i].letter.toLowerCase()}${this.tiles[i].numeric}` as Square;
    if (this.selected) {
      // const available = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
      const x = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
      console.log('Ruch', this.game.move({ from: x, to, promotion: 'q' }));
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
      this.selected = true;
      this.oldSelect = i;
      this.tileLighter();
    }
  }

  drag(event: CdkDragStart, i) {
    this.movedFigureColor = this.tiles[i].figureColor;
    for (let j = 0; j < this.size * this.size; j++) {
      this.tiles[j].toMove = false;
    }
    // event.source.element.nativeElement.   drag start mouse position
    this.oldSelect = i;
    this.savedPosition = this.oldSelect;
    this.tileLighter();
    const realValueX = (this.innerWidth - this.board.nativeElement.clientWidth) / 2;
    const realValueY = (this.innerHeight - this.board.nativeElement.clientHeight) / 2;
    fromEvent<MouseEvent>(window, 'mousemove').pipe(first()).subscribe(({ x, y }) => {

      this.positionX = x - realValueX;
      this.positionY = y - realValueY;
      event.source._dragRef.reset();
      this.selected = true;
    });
  }


  drop(event: CdkDragEnd) {
    const tileDimensions = this.board.nativeElement.offsetHeight / 8;
    const axisX = Math.floor((this.positionX + event.distance.x) / tileDimensions);
    const axisY = Math.floor((this.positionY + event.distance.y) / tileDimensions);
    this.moveTo = this.size * axisY + axisX;
    if (!(this.letters[axisX]) || !(this.numbers[axisY])) {
      event.source._dragRef.reset();
      return;
    }
    event.source._dragRef.reset();
    this.move(this.moveTo);
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

  newGame() {
    this.game.reset();
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

  tileLighter() {
    const available = `${this.tiles[this.oldSelect].letter.toLowerCase()}${this.tiles[this.oldSelect].numeric}` as Square;
    for (let j = 0; j < this.size * this.size; j++) {
      const tileChecked = `${this.tiles[j].letter.toLowerCase()}${this.tiles[j].numeric}` as Square;
      this.game.moves({ square: available }).forEach(toMove => {
        if (toMove.indexOf(tileChecked) > -1) {
          this.tiles[j].toMove = true;
        }
      });
    }
    if (this.game.moves({ square: available }).includes('O-O')) {
      if (this.movedFigureColor === 'b') {
        this.tiles[6].toMove = true;
      } else {
        this.tiles[62].toMove = true;
      }
    }
    if (this.game.moves({ square: available }).includes('O-O-O')) {
      if (this.movedFigureColor === 'b') {
        this.tiles[2].toMove = true;
      } else {
        this.tiles[58].toMove = true;
      }
    }
  }
}
