import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "../../../components/Layout"

import Container from "@material-ui/core/Container"

const BlogTagPagination = ({ pageContext, location, data }) => {
  const { name } = pageContext

  console.log(data?.allMarkdownRemark?.nodes)

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout path={location.pathname}>
      <Container maxWidth="md">
        <h1>{name}</h1>
        <div>
          {data?.allMarkdownRemark?.nodes.map((article, index) => (
            <div key={article.frontmatter.id}>
              <Link to={`/blog/article/${article.frontmatter.id}/`}>
                <GatsbyImage
                  image={getImage(article.frontmatter.cover)}
                  alt="aaa"
                />
              </Link>
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

export default BlogTagPagination

export const queryArticle = graphql`
  query blogTagListQuery($name: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: { tags: { in: [$name] }, published: { eq: true } }
      }
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
                formats: [AUTO, WEBP]
                width: 800
                aspectRatio: 1.77
              )
            }
          }
        }
      }
    }
  }
`
