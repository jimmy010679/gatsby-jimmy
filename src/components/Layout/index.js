import React from "react"

//import styles from "./layout.module.css"
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core"

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

const Layout = ({ children, type }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default Layout
