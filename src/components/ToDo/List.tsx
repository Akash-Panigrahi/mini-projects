function List({ todos, onToggleComplete, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              value={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
