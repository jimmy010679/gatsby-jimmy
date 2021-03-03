import React from "react"
import * as styles from "./index.module.css"

import {
  createMuiTheme,
  MuiThemeProvider,
  LinearProgress,
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
      <LinearProgress color="primary" className={styles.topProgress} />

      {children}
    </MuiThemeProvider>
  )
}

export default Layout
