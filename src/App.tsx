import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  Outlet,
  // Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
// import initStore from "./redux/store";
import CookieConsent from "react-cookie-consent";

// import { useContext } from "react";
import {
  DarkModeContext,
  DarkModeContextProps,
} from "./context/darkModeContext";

// import { AuthContext, AuthContextProps } from "./context/authContext";
// import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/authContext";

const App: React.FC = (): JSX.Element => {
  // const {currentUser} = useContext(AuthContext);

  // const { darkMode } = useContext(DarkModeContext);

  const darkModeContext = useContext<DarkModeContextProps | undefined>(
    DarkModeContext
  );
  // const authContext = useContext<AuthContextProps | undefined>(AuthContext);

  if (!darkModeContext) {
    throw new Error(
      "DarkModeContext must be used within a DarkModeContextProvider"
    );
  }

  // if (!authContext) {
  //   throw new Error("AuthContext must be used within an AuthContextProvider");
  // }

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

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }

  //   return children;
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <ProtectedRoute>
        <Layout />
        // </ProtectedRoute>
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
