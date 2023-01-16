import React, { useState } from "react";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";
import { auth } from "../firebase-config";
import { UserAuth } from "../AuthContext";
import { db } from "../firebase-config";
import { collection, addDoc } from "@firebase/firestore";

const Homepage = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, signin } = UserAuth();
  const usersRef = collection(db, "users");
  //   useEffect(() => {
  //     onAuthStateChanged(auth, (currentUser) => {
  //       setUser(currentUser);
  //     });
  //   }, []);

  const navigate = useNavigate();
  const register = async () => {
    setError("");
    try {
      await createUser(registerEmail, registerPassword);
      await addDoc(usersRef, {
        email: registerEmail,
        password: registerPassword,
      });
      navigate("/list");
    } catch (e) {
      alert(e.message);
    }
  };
  const login = async () => {
    setError("");
    try {
      await signin(loginEmail, loginPassword);
      navigate("/list");
    } catch (e) {
      setError(e.message);
      alert(e.message);
    }
  };

  return (
    <div className="center">
      <nav className="navbar">React 練習專案</nav>
      <Typography variant="h4">Sign Up</Typography>

      <div className="signup">
        <TextField
          placeholder="Email..."
          id="filled-basic"
          label="Email"
          variant="filled"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <TextField
          placeholder="Password..."
          id="filled-basic"
          label="Password"
          variant="filled"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <Button
          style={{ marginBottom: "30px" }}
          className="signbtn"
          variant="outlined"
          onClick={register}
        >
          Create User
        </Button>
      </div>
      <div className="signin">
        <Typography variant="h4">Login</Typography>
        <TextField
          placeholder="Email..."
          id="filled-basic"
          label="Email"
          variant="filled"
          onChange={(event) => {
            setloginEmail(event.target.value);
          }}
        />
        <TextField
          placeholder="Password..."
          id="filled-basic"
          label="Password"
          variant="filled"
          onChange={(event) => {
            setloginPassword(event.target.value);
          }}
        />
        <Button onClick={login} variant="outlined">
          Login
        </Button>
      </div>
      <Link className="btn" to="/list">
        Start
      </Link>
    </div>
  );
};

export default Homepage;
