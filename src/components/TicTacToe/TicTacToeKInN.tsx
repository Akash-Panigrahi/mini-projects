import { useState } from "react";
import "./style.css";
import type {
  TTTBoard,
  TTTCell,
  TTTKInNProps,
  TTTKInNWinningState,
} from "./types";

function isWithinBoundsAndSamePlayer(
  r: number,
  c: number,
  n: number,
  board: TTTBoard,
  player: TTTCell,
) {
  return r >= 0 && r <= n && c >= 0 && c <= n && board[r * n + c] === player;
}

function TicTacToeKInN({ n = 3, k = 3 }: TTTKInNProps) {
  const [board, setBoard] = useState<TTTBoard>(Array(n * n).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<TTTKInNWinningState>({
    state: false,
    player: null,
    cells: new Set(),
  });

  const handleCellClick = (row: number, col: number, idx: number) => {
    if (board[idx] || winner.state) return;

    const player = isXNext ? "X" : "O";

    const newBoard = [...board];
    newBoard[idx] = player;

    const dirs = [
      [0, 1], // horizontal
      [1, 0], // vertical
      [1, 1], // diagonal
      [1, -1], // antidiagonal
    ];

    for (const [dx, dy] of dirs) {
      const cells = new Set([`${row},${col}`]);

      // forward check
      let r = row + dx;
      let c = col + dy;

      while (isWithinBoundsAndSamePlayer(r, c, n, newBoard, player)) {
        cells.add(`${r},${c}`);
        r += dx;
        c += dy;
      }

      // backward check
      r = row - dx;
      c = col - dy;

      while (isWithinBoundsAndSamePlayer(r, c, n, newBoard, player)) {
        cells.add(`${r},${c}`);
        r -= dx;
        c -= dy;
      }

      if (cells.size >= k) {
        setWinner({ state: true, player, cells });
        break;
      }
    }

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(n * n).fill(null));
    setIsXNext(true);
    setWinner({ state: false, player: null, cells: new Set() });
  };

  return (
    <div className="tic-tac-toe">
      <span className="indicator">
        {winner.state
          ? `Winner: ${winner.player}`
          : board.every(Boolean)
            ? "Draw"
            : `Next Player: ${isXNext ? "X" : "O"}`}
      </span>

      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {board.map((cell, idx) => {
          const row = Math.floor(idx / n);
          const col = idx % n;
          const isWinningCell = winner.cells.has(`${row},${col}`);

          return (
            <div
              key={idx}
              className={`cell ${isWinningCell ? "win" : ""}`}
              onClick={() => handleCellClick(row, col, idx)}
              style={{
                backgroundColor: isWinningCell ? "green" : "",
                cursor: winner.state ? "not-allowed" : "pointer",
              }}
            >
              {cell}
            </div>
          );
        })}
      </div>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default TicTacToeKInN;
