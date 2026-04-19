import "./style.css";
import TicTacToe from "./TicTacToe";
import TicTacToeNxN from "./TicTacToeNxN";

function TicTacToePage() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <TicTacToe />
      <TicTacToeNxN n={4} />
    </div>
  );
}

export default TicTacToePage;
