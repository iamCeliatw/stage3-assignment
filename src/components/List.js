import React from "react";

const List = ({ text, todo, todos, setTodos, deleteTodo, updateTodo }) => {
  return (
    <div>
      <div className="eachList">
        <h2 className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {text}
        </h2>
        <button onClick={() => updateTodo(todo)} className="complete">
          DONE
        </button>
        <button onClick={() => deleteTodo(todo)} className="delete">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default List;
