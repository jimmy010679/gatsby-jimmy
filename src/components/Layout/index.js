import React from "react"

//import styles from "./layout.module.css"
import { CssBaseline } from "@material-ui/core"

const Layout = ({ children, type }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      {children}
    </React.Fragment>
  )
}

export default Layout
