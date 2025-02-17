import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { dark, light } from "@mui/material/styles/createPalette";

const crimson = "#6d1c1e";
const pinkRed = "#AE6577";
const deepRed = "#8b2233";

const lightBrown = "#cca586";
const brown = "#8b5a2b";
const paleBrown = "#bfaa8f";

const blue = "#1b5885";
const darkBlue = "#0f3057";
const darkGrey = "#314252";

const lightGrey = "#ececec";
const white = "#ffffff";
const black = "#000000";

const primaryColor = {
  main: deepRed,
  dark: crimson,
  light: pinkRed,
};

const secondaryColor = {
  main: lightBrown,
  dark: brown,
  light: paleBrown,
};

const tertiaryColor = {
  main: blue,
  dark: darkBlue,
  light: darkGrey,
};

const theme = createTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    background: {
      default: lightGrey,
      paper: white,
    },
    text: {
      primary: darkGrey,
      secondary: deepRed,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Roboto Slab", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "2.5rem",
      fontWeight: 900,
      color: primaryColor.dark,
    },
    h2: {
      fontFamily: '"Roboto Slab", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "2rem",
      fontWeight: 800,
      color: primaryColor.dark,
    },
    h3: {
      fontFamily: '"Roboto Slab", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1.75rem",
      fontWeight: 800,
      color: primaryColor.dark,
    },
    h4: {
      fontFamily: '"Roboto Slab", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1.5rem",
      fontWeight: 800,
      color: primaryColor.dark,
    },
    h5: {
      fontFamily: '"Roboto Slab", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1.25rem",
      fontWeight: 800,
      color: primaryColor.dark,
    },
    h6: {
      fontFamily: '"Roboto Slab", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1rem",
      fontWeight: 800,
      color: primaryColor.dark,
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "1rem",
      fontWeight: 400,
      color: primaryColor.dark,
    },
    body2: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: "0.875rem",
      fontWeight: 400,
      color: darkGrey,
    },
    button: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      color: white,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor.dark,
          color: white,
          "&:hover": {
            backgroundColor: primaryColor.main,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 3,
          borderRadius: 1,
          color: white,
          "& *::-webkit-scrollbar": {
            width: "8px",
          },
          "& *::-webkit-scrollbar-track": {
            background: primaryColor.main,
          },
          "& *::-webkit-scrollbar-thumb": {
            background: primaryColor.dark,
            borderRadius: "4px",
          },
          "& *::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "& *": {
            scrollbarColor: `${deepRed} ${lightGrey}`,
          },
        },
      },
    },
  },
});

const CustomThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default CustomThemeProvider;
