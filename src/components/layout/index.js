import React /*, { useContext }*/ from "react"

//import { VariablesContext } from "./variablesProvider"

import Header from "./header/header"
import Footer from "./footer/footer"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import * as styles from "./index.module.css"

// -----------------------------------------------------------------------------------------------------------------------------
// material-ui
const themeLight = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 920,
      lg: 1280,
      xl: 1920,
    },
  },
})

// -----------------------------------------------------------------------------------------------------------------------------

const Layout = ({ children, path }) => {
  // const { templateState } = useContext(VariablesContext)

  return (
    <ThemeProvider theme={themeLight}>
      <Header path={path} />
      <main id={styles.main}>{children}</main>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
