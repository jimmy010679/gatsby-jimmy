import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"

import Container from "@mui/material/Container"

const BlogPagination = ({ pageContext, location, data }) => {
  // ------------------------------------------------------------------------------------------------
  // 接收
  const { count, currentPage, numPages } = pageContext

  // ------------------------------------------------------------------------------------------------

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/blog/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  // ------------------------------------------------------------------------------------------------

  return (
    <Layout path={location.pathname}>
      <Seo title="部落格" isShowSiteName={true} description="部落格文章列表" />
      <Container maxWidth="md">
        <h1>{currentPage}</h1>
        <div>文章總數: {count}</div>
        <div>
          {data?.allMarkdownRemark?.nodes.map((article, index) => (
            <div key={article.frontmatter.id}>
              <Link to={`/blog/article/${article.frontmatter.urlTitle}/`}>
                <GatsbyImage
                  image={getImage(article.frontmatter.cover)}
                  alt={article.frontmatter.title}
                />
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

export default BlogPagination

export const queryArticles = graphql`
  query blogListQuery($nowDate: Date!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: { published: { eq: true }, publishDate: { lte: $nowDate } }
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
