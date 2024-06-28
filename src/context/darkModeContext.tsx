import { createContext, useEffect, useState, ReactNode } from "react";

// Define the shape of the context
export interface DarkModeContextProps {
  darkMode: boolean;
  toggle: () => void;
}

// Create the context with the correct type
export const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

// Define the props for the context provider
interface DarkModeContextProviderProps {
  children: ReactNode;
}

export const DarkModeContextProvider = ({
  children,
}: DarkModeContextProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Get the dark mode value from localStorage safely
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  });

  const toggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// import { createContext, useEffect, useState } from "react";
// import { DarkModeProps } from "../types/types";

// export const DarkModeContext = createContext("light");

// export const DarkModeContextProvider: React.FC<DarkModeProps> = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(
//     JSON.parse(localStorage.getItem("darkMode")) || false
//   );

//   const toggle = () => {
//     setDarkMode(!darkMode);
//   };

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   return (
//     <DarkModeContext.Provider value={{ darkMode, toggle }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };
