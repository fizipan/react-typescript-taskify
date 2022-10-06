import React, { useState, useEffect, useRef } from "react";
import { Todo } from "../models/Todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const handleEdit = (done: boolean) => {
    if (!edit && !done) {
      setEdit(!edit);
    }
  };

  const handleUpdate = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text: editTodo,
          };
        }
        return todo;
      })
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleUpdate(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__item ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              type="text"
              ref={inputRef}
              className="todos__item--text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <span className="todos__item--text">{todo.text}</span>
          ) : (
            <span className="todos__item--text">{todo.text}</span>
          )}

          <div>
            <span className="icon" onClick={() => handleEdit(todo.isDone)}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
