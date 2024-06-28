import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CookieConsent from "react-cookie-consent";
import ProtectedRoutes from "./hoc/ProtectedRoutes";

import {
  DarkModeContext,
  DarkModeContextProps,
} from "./context/darkModeContext";

const App: React.FC = (): JSX.Element => {
  console.log("My store:", store);
  const darkModeContext = useContext<DarkModeContextProps | undefined>(
    DarkModeContext
  );

  if (!darkModeContext) {
    throw new Error(
      "DarkModeContext must be used within a DarkModeContextProvider"
    );
  }

  const { darkMode } = darkModeContext;

  const Layout = () => {
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoutes isAllowed={!!user.authenticated}>
          <Layout />
        // </ProtectedRoutes>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <CookieConsent
        location="bottom"
        buttonText="Accept Cookie"
        cookieName="abbey-social"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
    </Provider>
  );
};

export default App;
