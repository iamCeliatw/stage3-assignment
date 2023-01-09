import React, { useState, useEffect } from "react";
import Addform from "../components/Addform";
import List from "../components/List";
import { json, Link } from "react-router-dom";

const Listpage = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  // run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);
  // useEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  //save to Local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      if (todoLocal.length === 0) {
        return null;
      }
      setTodos(todoLocal);
    }
  };

  return (
    <div className="center">
      {/* form */}
      <h1>TO DO LIST</h1>
      <Addform
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <hr />
      {filteredTodos.map((todo) => (
        <List
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          text={todo.text}
          key={todo.id}
        />
      ))}
      <Link className="btn center" to="/">
        Back
      </Link>
    </div>
  );
};

export default Listpage;
