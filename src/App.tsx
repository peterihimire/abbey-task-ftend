import "./style.scss";
import { useContext } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CookieConsent from "react-cookie-consent";
import AllRoutes from "./routes/Routes";

import {
  DarkModeContext,
  DarkModeContextProps,
} from "./context/darkModeContext";

const App: React.FC = (): JSX.Element => {
  const darkModeContext = useContext<DarkModeContextProps | undefined>(
    DarkModeContext
  );

  if (!darkModeContext) {
    throw new Error(
      "DarkModeContext must be used within a DarkModeContextProvider"
    );
  }

  return (
    <Provider store={store}>
      <AllRoutes />
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
