import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "/src/components/layout"

import Container from "@mui/material/Container"

const BlogTagPagination = ({ pageContext, location, data }) => {
  // ------------------------------------------------------------------------------------------------
  // 接收
  const { name, count, currentPage, numPages } = pageContext

  // ------------------------------------------------------------------------------------------------

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
        <h1>
          {name}
          <span>{count}</span>
        </h1>
        <div>
          {data?.allMarkdownRemark?.nodes.map((article, index) => (
            <div key={article.frontmatter.id}>
              <Link to={`/blog/article/${article.frontmatter.urlTitle}/`}>
                {article.frontmatter.cover ? (
                  <GatsbyImage
                    image={getImage(article.frontmatter.cover)}
                    alt="aaa"
                  />
                ) : (
                  <>無圖片</>
                )}
              </Link>
              <Link to={`/blog/article/${article.frontmatter.urlTitle}/`}>
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
  query blogTagListQuery(
    $nowDate: Date!
    $name: String
    $skip: Int!
    $limit: Int!
  ) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: {
          tags: { in: [$name] }
          published: { eq: true }
          publishDate: { lte: $nowDate }
        }
      }
      limit: $limit
      skip: $skip
      sort: {
        order: [DESC, DESC, DESC]
        fields: [
          frontmatter___updateDate
          frontmatter___publishDate
          frontmatter___id
        ]
      }
    ) {
      nodes {
        frontmatter {
          id
          urlTitle
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
