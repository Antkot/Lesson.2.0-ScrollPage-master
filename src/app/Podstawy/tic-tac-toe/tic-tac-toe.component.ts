import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
    this.build();
  }

  onClick(i: number) {
    let tile = this.tiles[i].sign;
    console.log('Kliknięto', i, 'znak:', this.tiles.find((value, index) => index === i).sign);
    console.log('Kliknięto', i, 'znak:', tile);
    if (tile === '') {
      if (this.player === 1) {
        this.tiles[i].sign = 'X';
        this.note = 'Player Two (O)';
      } else {
        this.tiles[i].sign = 'O';
        this.note = 'Player One (X)';
      }
    }
    this.winCheck();
    this.player *= -1;
  }

  winCheck() {
    // column check
    for (let i = 0; i < this.size; i++) {
      (i+this.size)
    }
    console.log('winCheck()');
  }

  smaller() {
    if (this.size < 4) {
      return;
    }
    this.size -= 1;
    this.build();
  }

  bigger() {
    this.size += 1;
    this.build();
  }

  build() {
    this.tiles = [];
    this.newsdas = `repeat( ${this.size}, 1fr)`;
    console.log(this.newsdas);
    for (let i = 0; i < this.size * this.size; i++) {
      this.tiles.push({ sign: '' });
    }
    this.player = 1;
    this.note = 'Welcome player one (X)';
  }

}
