// src/components/Layout.tsx
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import LeftBar from "../components/leftBar/LeftBar";
import RightBar from "../components/rightBar/RightBar";
import {
  DarkModeContext,
  DarkModeContextProps,
} from "../context/darkModeContext";

const Layout: React.FC = () => {
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

export default Layout;
