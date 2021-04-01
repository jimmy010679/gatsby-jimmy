import React from "react"

import Layout from "../../components/Layout"

import { Container } from "@material-ui/core"

import * as styles from "./index.module.css"

const Article = ({ pageContext, location }) => {
  const { title, content /*, cover*/ } = pageContext

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout path={location.pathname}>
      <Container maxWidth="md">
        <div className={styles.main}>
          <h1>{title}</h1>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Article
