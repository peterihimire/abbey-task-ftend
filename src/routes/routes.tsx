import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import LeftBar from "../components/leftBar/LeftBar";
import RightBar from "../components/rightBar/RightBar";
import { useAppSelector } from "../hooks/useTypedSelector";
import { RootState } from "../redux/store";
import {
  DarkModeContext,
  DarkModeContextProps,
} from "../context/darkModeContext";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ProtectedRoutes from "../hoc/ProtectedRoutes";

const Layout = () => {
  const darkModeContext = useContext<DarkModeContextProps | undefined>(
    DarkModeContext
  );
  if (!darkModeContext) {
    throw new Error(
      "DarkModeContext must be used within a DarkModeContextProvider"
    );
  }

  const { darkMode } = darkModeContext;

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

const AllRoutes = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoutes isAllowed={!!currentUser.authenticated}>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoutes isAllowed={!!currentUser.authenticated}>
                <Profile />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
