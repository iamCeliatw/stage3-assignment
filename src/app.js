import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/main.scss";
import Homepage from "./pages/Homepage";
import Listpage from "./pages/Listpage";
import { AuthContextProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
//<AuthContextProvider>裡的組件都是children
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/list" element={<Listpage />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
export default App;
