import { useState } from "react";
import "./style.css";
import type { TTTBoard, TTTNxNProps, TTTNxNWinningState } from "./types";

function TicTacToeNxN({ n = 3 }: TTTNxNProps) {
  const [board, setBoard] = useState<TTTBoard>(Array(n * n).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [rows, setRows] = useState(Array(n).fill(0));
  const [cols, setCols] = useState(Array(n).fill(0));
  const [diag, setDiag] = useState(0);
  const [antiDiag, setAntiDiag] = useState(0);
  const [winner, setWinner] = useState<TTTNxNWinningState>({
    state: false,
    player: null,
  });

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner.state) return;

    const row = Math.floor(idx / n);
    const col = idx % n;

    const d = isXNext ? 1 : -1;

    const newRows = [...rows];
    newRows[row] += d;

    const newCols = [...cols];
    newCols[col] += d;

    const newBoard = [...board];
    newBoard[idx] = isXNext ? "X" : "O";

    let newDiag = diag;
    let newAntiDiag = antiDiag;

    if (row === col) newDiag += d;
    if (row + col === n - 1) newAntiDiag += d;

    if (
      Math.abs(newRows[row]) === n ||
      Math.abs(newCols[col]) === n ||
      Math.abs(newDiag) === n ||
      Math.abs(newAntiDiag) === n
    ) {
      setWinner({ state: true, player: newBoard[idx] });
    }

    setRows(newRows);
    setCols(newCols);
    setDiag(newDiag);
    setAntiDiag(newAntiDiag);
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(n * n).fill(null));
    setIsXNext(true);
    setRows(Array(n).fill(0));
    setCols(Array(n).fill(0));
    setDiag(0);
    setAntiDiag(0);
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
          return (
            <div
              key={idx}
              className="cell"
              onClick={() => handleCellClick(idx)}
              style={{
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

export default TicTacToeNxN;
