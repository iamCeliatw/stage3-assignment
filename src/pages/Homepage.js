import React from "react";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="center">
      <nav className="navbar">React 練習專案</nav>
      <div className="mainPlace">Welcome to My page</div>
      <Link className="btn center" to="/list">
        Start
      </Link>
    </div>
  );
};

export default Homepage;
