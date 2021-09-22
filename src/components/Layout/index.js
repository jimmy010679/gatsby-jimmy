import React /*, { useContext }*/ from "react"
import * as styles from "./index.module.css"

//import { VariablesContext } from "./VariablesProvider"

import Header from "./Header"
import Footer from "./Footer"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import LinearProgress from "@mui/material/LinearProgress"

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
    <ThemeProvider theme={theme}>
      <LinearProgress color="primary" className={styles.topProgress} />
      <Header path={path} />
      {children}
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
