import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/Layout"

import Container from "@material-ui/core/Container"

const Portfolio = ({ pageContext, location }) => {
  const {
    title,
    content /*, cover*/,
    name_English,
    name_Chinese,
    publishDate,
    updateDate,
  } = pageContext

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout path={location.pathname}>
      <Container maxWidth="md">
        <div>
          <h1>{title}</h1>
          <div>
            分類:
            <Link to={`/portfolio/?category=${name_English}`}>
              {name_Chinese}
            </Link>
          </div>
          <div>
            <div>
              發布日期<span>{publishDate}</span>
            </div>
            {updateDate && (
              <div>
                更新日期 <span>{updateDate}</span>
              </div>
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <div></div>
        </div>
      </Container>
    </Layout>
  )
}

export default Portfolio
