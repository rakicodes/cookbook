import router from "../routes";
import { RouterProvider } from "react-router-dom";
import { createContext } from "react";
import { useState, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { getDesignTokens } from "./theme/theme";
import theme from "./theme/theme";

export const ThemeModeContext = createContext({
  toggleThemeMode: () => {},
  mode: null,
});

const initialMode = () => {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
  }
  return localStorage.getItem("theme");
};

const App = () => {
  const [mode, setMode] = useState(initialMode);

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    localStorage.setItem("theme", mode === "light" ? "dark" : "light");
  };

  const userTheme = useMemo(() => {
    const { palette } = getDesignTokens(mode);
    return createTheme({
      palette,
      ...theme,
    });
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ toggleThemeMode, mode }}>
      <ThemeProvider theme={userTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default App;
