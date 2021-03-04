import React from "react"
//import { Link } from "gatsby"

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
              <div>1</div>
            </Grid>
            <Grid item xs={12} md>
              <div>2</div>
            </Grid>
            <Grid item xs={12} md>
              <div>3</div>
            </Grid>
          </Grid>
        </div>

        <div className={styles.copyright}>
          Copyright © 2019-{new Date().getFullYear()} 幻想吉米 - Powered by
          JIMMY
        </div>
      </Container>
    </footer>
  )
}

export default Footer
