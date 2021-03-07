import React from "react"

import Layout from "../../components/Layout"

import { Container } from "@material-ui/core"

import * as styles from "./article.module.css"

const Article = ({ pageContext, location }) => {
  const { title, content /*, cover*/ } = pageContext

  //const remarkHTML = content.childMarkdownRemark.html
  //const aaa = remarkHTML.replace(/img/g, "StaticImage")

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
              __html: content.childMarkdownRemark.html,
            }}
          />
        </div>
      </Container>
    </Layout>
  )
}

export default Article
