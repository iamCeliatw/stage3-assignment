import React from "react";
import { useState } from "react";
import List from "./List";

const Addform = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  createTodo,
}) => {
  const inputTexthandler = (e) => {
    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    if (inputText === "") {
      alert("請輸入代辦事項");
      return;
    }
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 },
    ]);
    setInputText("");
    createTodo();
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };
  return (
    <div className="searchBar">
      <input
        value={inputText}
        onChange={inputTexthandler}
        type="text"
        placeholder="Type Here..."
      />
      <button onClick={submitTodoHandler}>SUBMIT</button>
      <select onChange={statusHandler} className="options">
        <option value="all" className="option">
          ALL
        </option>
        <option value="completed" className="option">
          Completed
        </option>
        <option value="uncompleted" className="option">
          Uncompleted
        </option>
      </select>
    </div>
  );
};

export default Addform;
