// import React, { Children } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import React from "react";

import { UserAuth } from "../AuthContext";
// const navigate = useNavigate();
const ProtectedRoute = () => {
  const { user } = UserAuth();
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
