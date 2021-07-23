import React from "react"
import { Link } from "gatsby"

import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

import * as styles from "./index.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="lg">
        <div className={styles.main}>
          <Grid container spacing={0}>
            <Grid item xs={12} md>
              <div>
                <h5>關於網站</h5>
                <ul>
                  <li>
                    <Link to="/">關於我</Link>
                  </li>
                  <li>
                    <a
                      href="https://github.com/jimmy010679"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/kyj-tw/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} md>
              <div>
                <h5>標籤分類</h5>
              </div>
            </Grid>
            <Grid item xs={12} md>
              <div>
                <h5>網站資訊</h5>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className={styles.copyright}>
          Copyright © 2019-2021 幻想吉米 - Powered by JIMMY
        </div>
      </Container>
    </footer>
  )
}

export default Footer
