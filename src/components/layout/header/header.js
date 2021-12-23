import React from "react"
import { Link } from "gatsby"

import Container from "@mui/material/Container"

import * as styles from "./header.module.css"

const Header = ({ path }) => {
  //console.log(path)
  return (
    <header id={styles.header}>
      <Container maxWidth="lg">
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link to="/" title="幻想吉米">
              幻想吉米
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link
                  to="/blog/"
                  activeClassName={styles.active}
                  partiallyActive={true}
                  title="部落格"
                >
                  部落格
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio/"
                  activeClassName={styles.active}
                  partiallyActive={true}
                  title="作品集"
                >
                  作品集
                </Link>
              </li>
              <li>
                <Link
                  to="/about/"
                  activeClassName={styles.active}
                  title="關於我"
                >
                  關於我
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}

export default Header
