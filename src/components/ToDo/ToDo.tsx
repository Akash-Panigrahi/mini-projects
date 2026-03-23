import { useState } from "react";
import Input from "./Input";
import List from "./List";
import Filter from "./Filter";

function ToDo() {
  const [state, setState] = useState({
    todos: [],
  });

  const [filter, setFilter] = useState("all");

  let filteredTodos = [];

  switch (filter) {
    case "active":
      filteredTodos = state.todos.filter((todo) => !todo.completed);
      break;
    case "completed":
      filteredTodos = state.todos.filter((todo) => todo.completed);
      break;
    default:
      filteredTodos = state.todos;
  }

  const handleAddToDo = (text: string) => {
    const newToDo = {
      id: crypto.randomUUID(),
      completed: false,
      text,
      createdAt: new Date().toISOString(),
    };

    setState((prev) => {
      return {
        ...prev,
        todos: [...prev.todos, newToDo],
      };
    });
  };

  const handleToggleComplete = (id: string) => {
    setState((prev) => {
      return {
        ...prev,
        todos: prev.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      };
    });
  };

  const handleDelete = (id: string) => {
    setState((prev) => {
      return {
        ...prev,
        todos: prev.todos.filter((todo) => todo.id !== id),
      };
    });
  };

  const handleReorder = ({ fromIndex, overIndex }) => {
    setState((prev) => {
      const updated = [...prev.todos];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(
        fromIndex < overIndex ? overIndex - 1 : overIndex,
        0,
        moved,
      );

      return { ...prev, todos: updated };
    });
  };

  return (
    <>
      <Input addToDo={handleAddToDo} />

      <Filter filter={filter} onFilterChange={setFilter} />

      <List
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onReorder={handleReorder}
      />
    </>
  );
}

export default ToDo;
