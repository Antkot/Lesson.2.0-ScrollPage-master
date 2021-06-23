import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {CalculatorComponent} from '../Calculator/calculator.component';
import {ToDoListComponent} from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  size = 3;
  tiles: Array<{ sign: string }> = [];
  newsdas = 'repeat( 3, 1fr)';
  player = 1;
  note = 'Welcome player one (X)';
  ended = 0;
  extendableStreak = 1;
  winStreak = 2 + Math.round(this.size / 3 + 0.33);
  @ViewChild('winner') winner: any;
  reset$ = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.build();
  }

  onClick(i: number) {
    if (this.ended !== 0) {
      return;
    }
    const tile = this.tiles[i].sign;
    if (!tile) {
      if (this.player === 1) {
        this.tiles[i].sign = 'X';
        this.note = 'Player Two (O)';
      } else {
        this.tiles[i].sign = 'O';
        this.note = 'Player One (X)';
      }
      this.player *= -1;
    }
    console.log('Kliknięto', i, 'znak:', tile);
    this.ended = this.winCheck();
    console.log('Stan ended:', this.ended);
    if (this.ended === 1) {
      const ref = this.dialog.open(this.winner);
      ref.afterClosed().subscribe(() => {
        this.build();
      });
      this.reset$.pipe(takeUntil(ref.afterClosed())).subscribe(() => {
          this.build();
          ref.close();
        }
      );
    }
  }

  winCheck() {
    // const grandLoop = this.size - this.winStreak + 1;
    //
    // // RZĘDY
    // for (let q = 0; q < grandLoop; q++) { // pole z którego zaczyna sprawdzanie
    //   for (let x = 0; x < this.size; x++) { // kolejne rzędy
    //     for (let p = 0; p < this.winStreak; p++) { // liczba znaków pod rząd do zwycięstwa
    //       const checkedTile = p + q + x * this.size;
    //       if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + 1].sign) {
    //         if (p + 2 === this.winStreak) {
    //           return 1;
    //         }
    //       } else {
    //         break;
    //       }
    //     }
    //   }
    // }
    // // KOLUMNY
    // for (let q = 0; q < grandLoop; q++) { // pole z którego zaczyna sprawdzanie
    //   for (let x = 0; x < this.size; x++) { // kolejne kolumny
    //     for (let p = 0; p < this.winStreak; p++) { // liczba znaków pod rząd do zwycięstwa
    //       const checkedTile = p * this.size + q * this.size + x;
    //       if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + this.size].sign) {
    //         if (p + 2 === this.winStreak) {
    //           return 1;
    //         }
    //       } else {
    //         break;
    //       }
    //     }
    //   }
    // }
    // // pierwszy skos
    // for (let q = 0; q < grandLoop; q++) {
    //   for (let x = 0; x < grandLoop; x++) {
    //     for (let p = 0; p < this.winStreak; p++) {
    //       const checkedTile = q * this.size + x + p * (this.size + 1);
    //       if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + this.size + 1].sign) {
    //         if (p + 2 === this.winStreak) {
    //           return 1;
    //         }
    //       } else {
    //         break;
    //       }
    //     }
    //   }
    // }
    // //drugi skos
    // for (let q = 0; q < grandLoop; q++) {
    //   for (let x = 0; x < grandLoop; x++) {
    //     for (let p = 0; p < this.winStreak; p++) {
    //       const checkedTile = q * this.size + this.size - x - 1 + p * (this.size - 1);
    //       if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + this.size - 1].sign) {
    //         if (p + 2 === this.winStreak) {
    //           return 1;
    //         }
    //       } else {
    //         break;
    //       }
    //     }
    //   }
    // }
    // return 0;
    const rows: Array<Array<string>> = [];
    const columns: Array<Array<string>> = [];
    const diagonals1: Array<Array<string>> = [];
    const diagonals2: Array<Array<string>> = [];
    for (let n = 1; n < this.size * 2; n++) {
      if (!diagonals1[n]) {
        diagonals1.push([]);
      }
    }
    this.tiles.forEach(({sign}, index) => {
      const column = index % this.size; // reszta z dzielenia
      const row = Math.floor(index / this.size);
      // console.log('liczba skosów: ', (this.size * 2 - 1));
      const diagonal1 = row + this.size - 1 - column;
      const diagonal2 = row + column;
      if (!columns[column]) {
        columns.push([]);
      }
      columns[column].push(sign);
      if (!rows[row]) {
        rows.push([]);
      }
      rows[row].push(sign);
      diagonals1[diagonal1].push(sign);
      if (!diagonals2[diagonal2]) {
        diagonals2.push([]);
      }
      diagonals2[diagonal2].push(sign);
    });
    if (this.winwin(rows) || this.winwin(columns) || this.winwin(diagonals1) || this.winwin(diagonals2)) {
      console.log(this.winwin(rows) || this.winwin(columns) || this.winwin(diagonals1) || this.winwin(diagonals2));
      return 1;
    }
    return 0;
  }

  winwin(value: Array<Array<string>>) {
    let ended = 0;
    const elementWin = value.filter((element, index) => element.filter((sign) => element.length >= this.winStreak));
    elementWin.forEach((element) => {
      let lastSign = null;
      let counter = 1;
      element.forEach((sign) => {
        if (lastSign !== null && sign === lastSign) {
          counter++;
        } else {
          counter = 1;
        }
        if (counter === this.winStreak) {
          ended = 1;
        }
        lastSign = sign;
      });
    });
    return ended;
  }

  smaller() {
    if (this.size > 3) {
      this.size -= 1;
    }
    this.build();
  }

  bigger() {
    this.size += 1;
    this.build();
  }

  build() {
    this.ended = 0;
    this.tiles = [];
    this.newsdas = `repeat( ${this.size}, 1fr)`;
    console.log(this.newsdas);
    for (let i = 0; i < this.size * this.size; i++) {
      this.tiles.push({sign: null});
    }
    this.player = 1;
    this.note = 'Welcome player one (X)';
    if (this.extendableStreak) {
      this.winStreak = 2 + Math.round(this.size / 3 + 0.33);
    } else {
      this.winStreak = this.size;
    }

  }

  playerName(i: number) {
    if (this.tiles[i].sign === 'X') {
      return 'One';
    }
    return 'Two';
  }

}
