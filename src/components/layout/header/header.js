import React from "react"
import { Link } from "gatsby"

import Container from "@mui/material/Container"

import * as styles from "./header.module.css"

const Header = ({ path }) => {
  //console.log(path)
  return (
    <header className={`${styles.header} ${styles.home}`}>
      <Container maxWidth="lg">
        <div>
          <Link to="/">幻想吉米</Link>
        </div>
        <div>
          <h1>Hello! I am Jimmy.</h1>
          <h3>Front-End Engineer</h3>
        </div>
      </Container>
    </header>
  )
}

export default Header
