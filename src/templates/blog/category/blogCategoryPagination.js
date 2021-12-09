import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"
import Breadcrumb from "/src/components/common/bread/breadcrumb"

import RemoveHTML from "/src/components/common/function/removeHTML"
import SubString from "/src/components/common/function/subString"

import Container from "@mui/material/Container"

import * as styles from "/src/templates/blog/blogPagination.module.css"

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
  const nextPage = `/blog/category/${name_English}/${(
    currentPage + 1
  ).toString()}/`

  // ------------------------------------------------------------------------------------------------
  return (
    <Layout path={location.pathname}>
      <Seo
        title={`${name_Chinese} / 標籤 / 部落格`}
        isShowSiteName={true}
        description="部落格文章列表"
      />
      <Container maxWidth="md">
        <div className={styles.blogContainer}>
          <Breadcrumb
            data={[
              {
                title: "部落格",
                link: "/blog/",
              },
              {
                title: `文章分類: ${name_Chinese}`,
                link: `/blog/category/${name_English}/`,
              },
            ]}
          />
          <h1 className={styles.h1}>
            <span className={styles.tag}>文章分類：</span>
            {name_Chinese}
            <span className={styles.count}>({count})</span>
          </h1>
          <div className={styles.posts}>
            {data?.articles?.nodes.map((article, index) => (
              <div className={styles.box} key={article.frontmatter.id}>
                <div className={styles.cover}>
                  <Link to={`/blog/article/${article.frontmatter.urlTitle}/`}>
                    {article.frontmatter.cover ? (
                      <GatsbyImage
                        image={getImage(article.frontmatter.cover)}
                        alt={article.frontmatter.title}
                      />
                    ) : (
                      <>無圖片</>
                    )}
                  </Link>
                </div>
                <div className={styles.text}>
                  <div className={styles.category}>
                    <Link to={`/blog/category/${name_English}/`}>
                      {name_Chinese}
                    </Link>
                  </div>
                  <div className={styles.title}>
                    <Link to={`/blog/article/${article.frontmatter.urlTitle}/`}>
                      {article.frontmatter.title}
                    </Link>
                  </div>
                  <div className={styles.description}>
                    {article.description
                      ? SubString({
                          str: article.description,
                          n: 180,
                          hasDot: true,
                        })
                      : SubString({
                          str: RemoveHTML({ html: article.html }),
                          n: 180,
                          hasDot: true,
                        })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <div className={styles.prev}>
              {!isFirst ? (
                <Link to={prevPage} rel="prev">
                  ← Previous Page
                </Link>
              ) : (
                <Link
                  to={location.pathname}
                  className={styles.noDrop}
                  rel="prev"
                >
                  ← Previous Page
                </Link>
              )}
            </div>
            <div className={styles.next}>
              {!isLast ? (
                <Link to={nextPage} rel="next">
                  Next Page →
                </Link>
              ) : (
                <Link
                  to={location.pathname}
                  className={styles.noDrop}
                  rel="next"
                >
                  Next Page →
                </Link>
              )}
            </div>
          </div>
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
    articles: allMarkdownRemark(
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
          description
        }
        html
      }
    }
  }
`
