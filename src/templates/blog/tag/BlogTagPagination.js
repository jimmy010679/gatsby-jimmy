import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "../../../components/Layout"

import Container from "@mui/material/Container"

const BlogTagPagination = ({ pageContext, location, data }) => {
  const { name, currentPage, numPages } = pageContext

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? `/blog/tag/${name}/` : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

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
        <div>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default BlogTagPagination

export const queryArticle = graphql`
  query blogTagListQuery($name: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: { tags: { in: [$name] }, published: { eq: true } }
      }
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: frontmatter___id }
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
