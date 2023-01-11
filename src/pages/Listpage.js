import React, { useState, useEffect } from "react";
import Addform from "../components/Addform";
import List from "../components/List";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "@firebase/firestore";

//listpage主程式 邏輯都寫在裡面
const Listpage = () => {
  //firebase
  const userCollectionRef = collection(db, "todos");

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //   useEffect(() => {
  //     const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
  //       setFilteredTodos(
  //         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //       );
  //     });
  //     return () => unsubscribe();
  //   }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      let filteredTodos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      switch (status) {
        case "completed":
          filteredTodos = filteredTodos.filter(
            (todo) => todo.completed === true
          );
          break;
        case "uncompleted":
          filteredTodos = filteredTodos.filter(
            (todo) => todo.completed === false
          );
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
      setFilteredTodos(filteredTodos);
    });
    return () => unsubscribe();
  }, [status]);

  const createTodo = async () => {
    await addDoc(userCollectionRef, { doThing: inputText, completed: false });
  };

  const updateTodo = async (todo) => {
    const userDoc = doc(db, "todos", todo.id);
    const newStatus = { completed: !todo.completed };
    await updateDoc(userDoc, newStatus);
  };

  const deleteTodo = async (id) => {
    const userDoc = doc(db, "todos", id);
    await deleteDoc(userDoc);
  };

  //   const completeHandler = async (todo) => {
  //     await updateDoc(doc(db, "todos", todo.id), {
  //       completed: !todo.completed,
  //     });
  //   };

  //   useEffect(() => {
  //     const getTodos = async () => {
  //       const data = await getDocs(userCollectionRef);
  //       setFilteredTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     };
  //     getTodos();
  //   }, []);

  useEffect(() => {
    filterHandler();
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

  //渲染
  return (
    <div className="center">
      <h1>TO DO LIST</h1>
      <Addform
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        createTodo={createTodo}
      />
      <hr />
      {filteredTodos.map((todo) => (
        <List
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          text={todo.doThing}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
      <Link className="btn btn-back center " to="/">
        Back
      </Link>
    </div>
  );
};

export default Listpage;
