import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/Layout"

import Container from "@material-ui/core/Container"

const BlogPagination = ({ pageContext, location, data }) => {
  const { currentPage } = pageContext

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout path={location.pathname}>
      <Container maxWidth="md">
        <h1>{currentPage}</h1>

        <div>
          {data?.allMarkdownRemark?.nodes.map((article, index) => (
            <div>
              <Link to={`/blog/article/${article.frontmatter.id}/`}>
                {article.frontmatter.title}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export default BlogPagination

export const queryNewArticle = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: { published: { eq: true } }
      }
      limit: $limit
      skip: $skip
      sort: { order: ASC, fields: frontmatter___id }
    ) {
      nodes {
        frontmatter {
          id
          title
          cover {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                width: 800
                aspectRatio: 1.77
              )
            }
          }
        }
        html
      }
    }
  }
`
