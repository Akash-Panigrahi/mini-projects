export type TTTCell = "X" | "O" | null;

export type TTTBoard = TTTCell[];

export type TTTNxNProps = { n: number };

export type TTTNxNWinningState = { state: boolean; player: TTTCell };

export type TTTKInNProps = { n: number; k: number };

export type TTTKInNWinningState = {
  state: boolean;
  player: TTTCell;
  cells: Set<string>;
};
