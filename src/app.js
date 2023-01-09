import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.css";
import Homepage from "./pages/Homepage";
import Listpage from "./pages/Listpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/list" element={<Listpage />} />
      </Routes>
    </div>
  );
}
export default App;
