import React from "react"
//import { Link } from "gatsby"

import Container from "@material-ui/core/Container"
//import Grid from "@material-ui/core/Grid"
import * as styles from "./index.module.css"

const Header = ({ path }) => {
  console.log(path)
  return (
    <header className={`${styles.header} ${styles.home}`}>
      <Container maxWidth="lg">
        <div>123</div>
      </Container>
    </header>
  )
}

export default Header
