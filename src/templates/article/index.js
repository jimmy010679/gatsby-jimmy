import React from "react"

//import { code } from "../../components/Common/Code"
import Layout from "../../components/Layout"

import { Container } from "@material-ui/core"

const Article = ({ pageContext, location }) => {
  const { aid, title, content } = pageContext

  console.log(content)

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout>
      <Container maxWidth="lg">
        <h1>
          {aid}
          {title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </Container>
    </Layout>
  )
}

export default Article
