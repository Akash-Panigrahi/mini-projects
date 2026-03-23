import type { FormEvent } from "react";

function Input({ addToDo }) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    addToDo(form.elements["new-todo-text"].value);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="new-todo-text" />
      <button type="reset">Clear</button>
      <button type="submit">Add ToDo</button>
    </form>
  );
}

export default Input;
