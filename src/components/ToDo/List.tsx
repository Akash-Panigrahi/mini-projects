import { Fragment, useRef, useState } from "react";

function List({ todos, onToggleComplete, onDelete, onReorder }) {
  const frame = useRef(0);

  const [dragState, setDragState] = useState({
    draggingId: "",
    fromIndex: null,
    overIndex: null,
  });

  const handleDragStart = (e, id, index) => {
    setDragState({
      draggingId: id,
      fromIndex: index,
      overIndex: index,
    });
  };

  const updateDragPosition = (e, index) => {
    const source = e.target.getBoundingClientRect();
    const mid = source.top + source.height / 2;
    const overIndex = e.clientY < mid ? index : index + 1;

    setDragState((prev) => {
      if (prev.overIndex === overIndex) return prev;

      return {
        ...prev,
        overIndex,
      };
    });
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => updateDragPosition(e, index));
  };

  const handleDrop = (e) => {
    onReorder(dragState);
    resetDragState();
  };

  const resetDragState = () => {
    setDragState({
      draggingId: "",
      fromIndex: null,
      overIndex: null,
    });
  };

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "0",
      }}
      onDrop={handleDrop}
    >
      {todos.map((todo, index) => {
        const isDragging = dragState.draggingId === todo.id;

        return (
          <Fragment key={todo.id}>
            <li
              style={{
                opacity: isDragging ? 0.3 : 1,
                transition: "all 150ms ease",
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, todo.id, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={resetDragState}
            >
              <input
                type="checkbox"
                value={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}

export default List;
