import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"
import Breadcrumb from "/src/components/common/bread/breadcrumb"

import RemoveHTML from "/src/components/common/function/removeHTML"
import SubString from "/src/components/common/function/subString"

import Menu from "/src/components/blog/menu"
import Pagination from "/src/components/blog/pagination"

import Container from "@mui/material/Container"

import * as styles from "/src/templates/blog/blogPagination.module.css"

const BlogPagination = ({ pageContext, location, data }) => {
  // ------------------------------------------------------------------------------------------------
  // 接收
  const { /*count,*/ currentPage, numPages, blogCategory } = pageContext

  // ------------------------------------------------------------------------------------------------

  return (
    <Layout path={location.pathname}>
      <Seo title="部落格" isShowSiteName={true} description="部落格文章列表" />
      <Container maxWidth="lg">
        <div className={styles.blogContainer}>
          <Breadcrumb
            data={[
              {
                title: "部落格",
                link: "/blog/",
              },
            ]}
          />
          <h1>部落格</h1>
          <div className={styles.content}>
            <div className={styles.menu}>
              <Menu blogCategory={blogCategory} />
            </div>
            <div className={styles.posts}>
              {data?.articles?.nodes.map((article, index) => (
                <div className={styles.box} key={article.frontmatter.id}>
                  <div className={styles.cover}>
                    <Link
                      to={`/blog/article/${article.frontmatter.urlTitle}/`}
                      title={article.frontmatter.title}
                    >
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
                      <Link
                        to={`/blog/category/${
                          blogCategory.find(
                            x => x.cid === article.frontmatter.cid
                          ).name_English
                        }/`}
                        title={
                          blogCategory.find(
                            x => x.cid === article.frontmatter.cid
                          ).name_Chinese
                        }
                      >
                        {
                          blogCategory.find(
                            x => x.cid === article.frontmatter.cid
                          ).name_Chinese
                        }
                      </Link>
                    </div>
                    <div className={styles.title}>
                      <Link
                        to={`/blog/article/${article.frontmatter.urlTitle}/`}
                        title={article.frontmatter.title}
                      >
                        <h5>{article.frontmatter.title}</h5>
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
                    <div className={styles.date}>
                      {article.frontmatter.updateDate.slice(0, 10)}
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                currentPage={currentPage}
                numPages={numPages}
                pathname={location.pathname}
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default BlogPagination

export const queryArticles = graphql`
  query blogListQuery($nowDate: Date!, $skip: Int!, $limit: Int!) {
    articles: allMarkdownRemark(
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
          cid
          updateDate
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
