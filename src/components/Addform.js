import React from "react";
import { useState } from "react";
import List from "./List";

const Addform = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const inputTexthandler = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 },
    ]);
    setInputText("");
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
      <button onClick={submitTodoHandler}>Submit</button>
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
