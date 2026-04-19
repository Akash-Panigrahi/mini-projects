import "./style.css";
import TicTacToe from "./TicTacToe";
import TicTacToeNxN from "./TicTacToeNxN";
import TicTacToeKInN from "./TicTacToeKInN";

function TicTacToePage() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <TicTacToe />
      <TicTacToeNxN n={4} />
      <TicTacToeKInN n={5} k={3} />
    </div>
  );
}

export default TicTacToePage;
