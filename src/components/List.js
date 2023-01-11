import { updateDoc } from "@firebase/firestore";
import { async } from "@firebase/util";
import React from "react";

const List = ({ text, todo, todos, setTodos, deleteTodo, updateTodo }) => {
  //   console.log(todos);
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
    deleteTodo(todo.id);
  };

  return (
    <div>
      <div className="eachList">
        <h2 className={`todo-item ${todo.completed ? "completed" : ""}`}>
          {text}
        </h2>
        <button onClick={() => updateTodo(todo)} className="complete">
          DONE
        </button>
        <button onClick={deleteHandler} className="delete">
          DELETE
        </button>
      </div>
    </div>
  );
};

export default List;

// setTodos(
//     todos.map((item) => {
//       if (item.id === todo.id) {
//         return { ...item, completed: !item.completed };
//       }
//       // return item;
//     })
//   );
