import React from "react"
import { Link } from "gatsby"
import Layout from "../../../components/Layout"

import Container from "@material-ui/core/Container"

import * as styles from "./index.module.css"

const Article = ({ pageContext, location }) => {
  const { title, content /*, cover*/, name_English, name_Chinese, tags } =
    pageContext

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout path={location.pathname}>
      <Container maxWidth="md">
        <div className={styles.main}>
          <h1>{title}</h1>
          <div>
            分類:
            <Link to={`/blog/category/${name_English}/`}>{name_Chinese}</Link>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <div>
            {tags.map((tag, i) => (
              <Link to={`/blog/tag/${tag}/`} key={i}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Article
