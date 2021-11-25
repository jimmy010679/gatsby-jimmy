import React /*, { useContext }*/ from "react"

//import { VariablesContext } from "./variablesProvider"

import Header from "./header/header"
import Footer from "./footer/footer"

import { createTheme, ThemeProvider } from "@mui/material/styles"

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
      <Header path={path} />
      {children}
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
