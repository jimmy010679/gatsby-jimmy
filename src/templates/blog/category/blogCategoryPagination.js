import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "/src/components/layout"

import Container from "@mui/material/Container"

const BlogCategoryPagination = ({ pageContext, location, data }) => {
  // ------------------------------------------------------------------------------------------------
  // 接收
  const { count, name_English, name_Chinese, currentPage, numPages } =
    pageContext

  // ------------------------------------------------------------------------------------------------

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? `/blog/category/${name_English}/`
      : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  // ------------------------------------------------------------------------------------------------
  return (
    <Layout path={location.pathname}>
      <Container maxWidth="md">
        <h1>{name_Chinese}</h1>
        <div>文章總數: {count}</div>
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

export default BlogCategoryPagination

export const queryArticle = graphql`
  query blogCategoryListQuery(
    $nowDate: Date!
    $cid: Int
    $skip: Int!
    $limit: Int!
  ) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: {
          cid: { in: [$cid] }
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
