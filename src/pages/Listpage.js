import React, { useState, useEffect } from "react";
import Addform from "../components/Addform";
import List from "../components/List";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  query,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDocs,
  setDoc,
} from "@firebase/firestore";

import { UserAuth } from "../AuthContext";

//listpage主程式 邏輯都寫在裡面
const Listpage = () => {
  const { user, logout } = UserAuth();
  //firebase
  const userId = user.uid;

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
      console.log("you are log out!");
    } catch (e) {
      alert(e.message);
    }
  };

  const getTodos = async () => {
    const q = query(collection(db, "users"));
    const snapshot = await getDocs(q);
    // console.log(snapshot);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // console.log(data);
    data.map(async (elem) => {
      if (elem.email === user.email) {
        const todoQ = query(collection(db, `users/${elem.id}/todos`));
        const todoDetail = await getDocs(todoQ);
        const todoInfo = todoDetail.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTodos(todoInfo);
        // console.log(todoInfo);
      }
    });
  };

  useEffect(() => {
    getTodos();
  }, [user.email]);

  const createTodo = async () => {
    const q = query(collection(db, "users"));
    const querySnapShot = await getDocs(q);
    const queryData = querySnapShot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    console.log(queryData);
    queryData.map(async (elem) => {
      if (elem.email === user.email) {
        await setDoc(doc(db, `users/${elem.id}/todos/${inputText}`), {
          doThing: inputText,
          completed: false,
        });
      }
    });
    getTodos();
  };

  const updateTodo = async (todo) => {
    const q = query(collection(db, "users"));
    const querySnapShot = await getDocs(q);
    const queryData = querySnapShot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    queryData.map(async (elem) => {
      const todoQ = query(collection(db, `users/${elem.id}/todos`));
      const todoDetail = await getDocs(todoQ);
      const todoInfo = todoDetail.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const clickedTodo = todoInfo.find((t) => t.id === todo.id);
      if (clickedTodo) {
        const userDoc = doc(db, `users/${elem.id}/todos/`, todo.id);
        const newStatus = { completed: !todo.completed };
        await updateDoc(userDoc, newStatus);
      }
      getTodos();
    });
  };
  //   console.log(user && user.email);
  const deleteTodo = async (todo) => {
    const q = query(collection(db, "users"));
    const querySnapShot = await getDocs(q);
    const queryData = querySnapShot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    queryData.map(async (elem) => {
      const todoQ = query(collection(db, `users/${elem.id}/todos`));
      const todoDetail = await getDocs(todoQ);
      const todoInfo = todoDetail.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const clickedTodo = todoInfo.find((t) => t.id === todo.id);
      if (clickedTodo) {
        const userDoc = doc(db, `users/${elem.id}/todos/`, todo.id);
        await deleteDoc(userDoc);
      }
      getTodos();
    });
  };

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
      <p>User email : {user && user.email}</p>
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
      <button onClick={logoutHandler} className="btn">
        Sign out
      </button>
    </div>
  );
};

export default Listpage;
