import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  size = 5;
  tiles: Array<{ sign: string }> = [];
  newsdas = 'repeat( 3, 1fr)';
  player = 1;
  note = 'Welcome player one (X)';
  ended = 0;
  winStreak = 2 + Math.round(this.size / 3 + 0.33);

  constructor() {
  }

  ngOnInit(): void {
    this.build();
  }

  onClick(i: number) {
    if (this.ended !== 0) {
      return;
    }
    const tile = this.tiles[i].sign;
    if (tile === '') {
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
    if (this.ended === 1) {
      this.note = ('Game won by player ' + this.playerName(i));
    }
  }

  winCheck() {
    console.log('Wymagany streak:', this.winStreak);
    const grandLoop = this.size - this.winStreak + 1;
    console.log('Wymagane obroty wielkiej pętli:', grandLoop);

    // RZĘDY
    for (let q = 0; q < grandLoop; q++) { // pole z którego zaczyna sprawdzanie
      console.log('Obroty wielkiej pętli rzędów', q + 1, ' / ', grandLoop);
      for (let x = 0; x < this.size; x++) { // kolejne rzędy
        for (let p = 0; p < this.winStreak; p++) { // liczba znaków pod rząd do zwycięstwa
          const checkedTile = p + q + x * this.size;
          if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + 1].sign) {
            console.log('Aktualny streak', p + 2, ' / ', this.winStreak);
            if (p + 2 === this.winStreak) {
              console.log('Game won by player ', this.playerName(checkedTile));
              return 1;
            }
          } else {
            break;
          }
        }
      }
    }
    // KOLUMNY
    for (let q = 0; q < grandLoop; q++) { // pole z którego zaczyna sprawdzanie
      console.log('Obroty wielkiej pętli kolumn', q + 1, ' / ', grandLoop);
      for (let x = 0; x < this.size; x++) { // kolejne kolumny
        for (let p = 0; p < this.winStreak; p++) { // liczba znaków pod rząd do zwycięstwa
          const checkedTile = p * this.size + q * this.size + x;
          if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + this.size].sign) {
            console.log('Aktualny streak', p + 2, ' / ', this.winStreak);
            if (p + 2 === this.winStreak) {
              console.log('Game won by player ', this.playerName(checkedTile));
              return 1;
            }
          } else {
            break;
          }
        }
      }
    }
    // pierwszy skos
    for (let q = 0; q < grandLoop; q++) {
      console.log('Obroty wielkiej pętli skosu', q + 1, ' / ', grandLoop);
      for (let x = 0; x < grandLoop; x++) {
        for (let p = 0; p < this.winStreak; p++) {
          const checkedTile = q * this.size + x + p * (this.size + 1);
          if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + this.size + 1].sign) {
            console.log('Aktualny streak', p + 2, ' / ', this.winStreak);
            if (p + 2 === this.winStreak) {
              console.log('Game won by player ', this.playerName(checkedTile));
              return 1;
            }
          } else {
            break;
          }
        }
      }
    }
    //drugi skos
    for (let q = 0; q < grandLoop; q++) {
      console.log('Obroty wielkiej pętli skosu 2', q + 1, ' / ', grandLoop);
      for (let x = 0; x < grandLoop; x++) {
        for (let p = 0; p < this.winStreak; p++) {
          const checkedTile = q * this.size + this.size - x - 1 + p * (this.size - 1);
          if (this.tiles[checkedTile].sign !== '' && this.tiles[checkedTile].sign === this.tiles[checkedTile + this.size - 1].sign) {
            console.log('Aktualny streak', p + 2, ' / ', this.winStreak);
            if (p + 2 === this.winStreak) {
              console.log('Game won by player ', this.playerName(checkedTile));
              return 1;
            }
          } else {
            break;
          }
        }
      }
    }
    return 0;
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
      this.tiles.push({sign: ''});
    }
    this.player = 1;
    this.note = 'Welcome player one (X)';
    this.winStreak = 2 + Math.round(this.size / 3 + 0.33);

  }

  playerName(i: number) {
    if (this.tiles[i].sign === 'X') {
      return 'One';
    }
    return 'Two';
  }

}
