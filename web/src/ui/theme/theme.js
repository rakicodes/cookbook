import { LIGHT_THEME } from "./palette/lightTheme";
import { DARK_THEME } from "./palette/darkTheme";
import "@fontsource-variable/josefin-sans";
import "@fontsource/cardo";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light" ? LIGHT_THEME : DARK_THEME),
  },
});
const theme = {
  typography: {
    fontFamily: [
      '"Josefin Sans Variable"',
      "Roboto",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    body1: {
      fontFamily: [
        "Cardo",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "2rem",
    },
  },
  maxWidth: 900,
};

export default theme;
