import { useState } from "react";
import "./style.css";
import type { TTTBoard } from "./types";

function getWinner(board: TTTBoard) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { state: true, player: board[a], lines: [a, b, c] };
    }
  }

  return { state: false };
}

function TicTacToe() {
  const [board, setBoard] = useState<TTTBoard>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = getWinner(board);

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner.state) return;

    const newBoard = [...board];
    newBoard[idx] = isXNext ? "X" : "O";

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
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

      <div className="board">
        {board.map((cell, idx) => {
          return (
            <div
              key={idx}
              className="cell"
              onClick={() => handleCellClick(idx)}
              style={{
                backgroundColor: winner?.lines?.includes(idx) ? "green" : "",
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

export default TicTacToe;
