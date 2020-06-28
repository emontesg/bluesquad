import React from "react";
import ReactDOM from "react-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";

const theme = createMuiTheme({
  palette: {
    background: { default: "#263238" },
    primary: {
      main: green["500"],
    },
    secondary: {
      main: red["600"],
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
