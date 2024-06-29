import "./style.scss";
import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import CookieConsent from "react-cookie-consent";
import createRoutes from "./routes/routes";
import { RootState } from "./redux/store";
import { useAppSelector } from "./hooks/useTypedSelector";

import {
  DarkModeContext,
  DarkModeContextProps,
} from "./context/darkModeContext";

const App: React.FC = (): JSX.Element => {
  const darkModeContext = useContext<DarkModeContextProps | undefined>(
    DarkModeContext
  );
  const currentUser = useAppSelector((state: RootState) => state.auth);

  if (!darkModeContext) {
    throw new Error(
      "DarkModeContext must be used within a DarkModeContextProvider"
    );
  }
  const router = createRoutes(!!currentUser.authenticated);
  const { darkMode } = darkModeContext;

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
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
    </div>
  );
};

export default App;
