export type ColumnId = string;
export type CardId = string;

export type Column = {
  id: ColumnId;
  name: string;
  cardIds: CardId[];
};

export type Card<T = Record<string, unknown>> = {
  id: CardId;
} & T;

export type BoardState<T = Record<string, unknown>> = {
  columns: Record<ColumnId, Column>;
  cards: Record<CardId, Card<T>>;
  columnOrder: ColumnId[];
};

export type CardDragState = {
  cardId: CardId;
  sourceColId: ColumnId;
  sourceIndex: number;
};
