import React /*, { useContext }*/ from "react"
import * as styles from "./index.module.css"

//import { VariablesContext } from "./VariablesProvider"

import Header from "./Header"
import Footer from "./Footer"

import {
  createTheme,
  MuiThemeProvider,
  LinearProgress,
} from "@material-ui/core"

// -----------------------------------------------------------------------------------------------------------------------------
// material-ui
const theme = createTheme({
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

// -----------------------------------------------------------------------------------------------------------------------------

const Layout = ({ children, path }) => {
  // const { templateState } = useContext(VariablesContext)

  return (
    <MuiThemeProvider theme={theme}>
      <LinearProgress color="primary" className={styles.topProgress} />
      <Header path={path} />
      {children}
      <Footer />
    </MuiThemeProvider>
  )
}

export default Layout
