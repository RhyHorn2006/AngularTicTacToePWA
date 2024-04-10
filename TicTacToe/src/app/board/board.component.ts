import { Component } from '@angular/core';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SquareComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  squares!: any[];
  xIsNext!: boolean;
  winner!: string;

  constructor() {

  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = "null";
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : '0';
  }

  makeMove(index: number) {
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [x, y, z] = lines[i];
      if (
        this.squares[x] &&
        this.squares[x] === this.squares[y] &&
        this.squares[x] === this.squares[z]
      ) {
        return this.squares[x];
      }
    }
    return null;
  }
}
