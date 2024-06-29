import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layouts";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ProtectedRoutes from "../hoc/ProtectedRoutes";

const createRoutes = (isAuthenticated: boolean) => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes isAllowed={isAuthenticated}>
          <Layout />
        </ProtectedRoutes>
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
};

export default createRoutes;
