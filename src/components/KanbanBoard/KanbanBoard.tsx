import { useState, type DragEvent } from "react";
import "./style.css";
import type { BoardState, CardDragState, CardId, ColumnId } from "./types";

const initialData: BoardState<{ content: string }> = {
  columns: {
    toDo: {
      id: "toDo",
      name: "To Do",
      cardIds: ["c1", "c2", "c3"],
    },
    doing: {
      id: "doing",
      name: "Doing",
      cardIds: ["c4", "c5"],
    },
    done: {
      id: "done",
      name: "Done",
      cardIds: [],
    },
  },

  cards: {
    c1: {
      id: "c1",
      content: "Card 1",
    },
    c2: {
      id: "c2",
      content: "Card 2",
    },
    c3: {
      id: "c3",
      content: "Card 3",
    },
    c4: {
      id: "c4",
      content: "Card 4",
    },
    c5: {
      id: "c5",
      content: "Card 5",
    },
  },

  columnOrder: ["toDo", "doing", "done"],
};

function KanbanBoard() {
  const [data, setData] = useState(initialData);
  const [dragState, setDragState] = useState<CardDragState | null>(null);

  const handleDragStart = (
    sourceColId: ColumnId,
    cardId: CardId,
    sourceIndex: number,
  ) => {
    setDragState({
      sourceColId,
      cardId,
      sourceIndex,
    });
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (
    e: DragEvent,
    destColumnId: ColumnId,
    destCardIndex: number,
  ) => {
    e.stopPropagation();
    if (!dragState) return;

    const { sourceColId, cardId, sourceIndex } = dragState;

    const sourceCol = data.columns[sourceColId];
    const destCol = data.columns[destColumnId];

    if (sourceColId === destColumnId) {
      const newCardIds = [...sourceCol.cardIds];
      newCardIds.splice(sourceIndex, 1);
      newCardIds.splice(destCardIndex, 0, cardId);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceColId]: {
            ...sourceCol,
            cardIds: newCardIds,
          },
        },
      });
    } else {
      const sourceCardIds = [...sourceCol.cardIds];
      sourceCardIds.splice(sourceIndex, 1);

      const destCardIds = [...destCol.cardIds];
      destCardIds.splice(destCardIndex, 0, cardId);

      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceColId]: {
            ...sourceCol,
            cardIds: sourceCardIds,
          },
          [destColumnId]: {
            ...destCol,
            cardIds: destCardIds,
          },
        },
      });
    }

    setDragState(null);
  };

  const handleDragEnd = () => {
    setDragState(null);
  };

  return (
    <div className="kanban-board">
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];

        return (
          <div
            key={columnId}
            className="column"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, columnId, column.cardIds.length)}
          >
            <h3>{column.name}</h3>

            <div className="cards">
              {column.cardIds.map((cardId, cardIndex) => {
                const card = data.cards[cardId];
                const isDragging =
                  dragState?.sourceColId === columnId &&
                  dragState?.sourceIndex === cardIndex;

                return (
                  <div key={cardId} onDragOver={(e) => handleDragOver(e)}>
                    <div
                      className="card"
                      draggable
                      onDragStart={() =>
                        handleDragStart(columnId, cardId, cardIndex)
                      }
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => handleDrop(e, columnId, cardIndex)}
                      style={{ opacity: isDragging ? "0.3" : "1" }}
                    >
                      {card.content}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;
