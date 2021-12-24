import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Seo from "/src/components/common/seo"
import Layout from "/src/components/layout"

import Container from "@mui/material/Container"

import RemoveHTML from "/src/components/common/function/removeHTML"
import SubString from "/src/components/common/function/subString"

// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/swiper.scss"
import * as styles from "./index.module.css"

const Home = ({ pageContext, location, data }) => {
  const { blogCategory, portfolioCategory } = pageContext

  return (
    <Layout path={location.pathname}>
      <Seo isShowSiteName={false} />
      <div className={styles.blogNews}>
        <Container maxWidth="lg">
          <div className={styles.content}>
            <div className={styles.head}>
              <div className={styles.title}>
                <h2>最新文章</h2>
              </div>
              <div className={styles.more}>
                <Link to="/blog/" title="看更多">
                  看更多
                </Link>
              </div>
            </div>
            <div className={styles.news}>
              <div className={styles.top}>
                {data?.articles.nodes[0] && (
                  <>
                    <div className={styles.cover}>
                      <Link
                        to={`/blog/article/${data.articles.nodes[0].frontmatter.urlTitle}/`}
                        title={data.articles.nodes[0].frontmatter.title}
                      >
                        {data.articles.nodes[0].frontmatter.cover ? (
                          <GatsbyImage
                            image={getImage(
                              data.articles.nodes[0].frontmatter.cover
                            )}
                            alt={data.articles.nodes[0].frontmatter.title}
                          />
                        ) : (
                          <>無圖片</>
                        )}
                      </Link>
                    </div>
                    <div className={styles.detail}>
                      <Link
                        className={styles.title}
                        to={`/blog/article/${data.articles.nodes[0].frontmatter.urlTitle}/`}
                        title={data.articles.nodes[0].frontmatter.title}
                      >
                        <h5>{data.articles.nodes[0].frontmatter.title}</h5>
                      </Link>
                      <p className={styles.description}>
                        {data.articles.nodes[0].frontmatter.description
                          ? SubString({
                              str: data.articles.nodes[0].frontmatter
                                .description,
                              n: 180,
                              hasDot: true,
                            })
                          : SubString({
                              str: RemoveHTML({
                                html: data.articles.nodes[0].html,
                              }),
                              n: 180,
                              hasDot: true,
                            })}
                      </p>
                      <Link
                        className={styles.look}
                        to={`/blog/article/${data.articles.nodes[0].frontmatter.urlTitle}/`}
                        title={data.articles.nodes[0].frontmatter.title}
                      >
                        了解更多
                      </Link>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.lists}>
                {data?.articles?.nodes.map(
                  (article, index) =>
                    index > 0 && (
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
                          <div className={styles.date}>
                            {article.frontmatter.updateDate.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.protfolio}>
        <Container maxWidth="lg">
          <div className={styles.content}>
            <div className={styles.head}>
              <div className={styles.title}>
                <h2>作品集</h2>
              </div>
              <div className={styles.more}>
                <Link to="/portfolio/" title="看更多">
                  看更多
                </Link>
              </div>
            </div>
            <div className={styles.lists}>
              {data?.portfolio?.nodes.map((item, index) => (
                <div className={styles.work} key={item.frontmatter.id}>
                  <Link
                    to={`/portfolio/${item.frontmatter.urlTitle}/`}
                    title={item.frontmatter.title}
                  >
                    <div className={styles.cover}>
                      <GatsbyImage
                        image={getImage(item.frontmatter.cover)}
                        alt={item.frontmatter.title}
                      />
                    </div>
                    <div className={styles.detail}>
                      <div className={styles.category}>
                        {
                          portfolioCategory.find(
                            x => x.pid === item.frontmatter.pid
                          ).name_Chinese
                        }
                      </div>
                      <h5>{item.frontmatter.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Home

export const queryHomePageData = graphql`
  query homePageQuery($nowDate: Date!) {
    articles: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: { published: { eq: true }, publishDate: { lte: $nowDate } }
      }
      limit: 4
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

    portfolio: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/portfolio/" }
        frontmatter: { published: { eq: true }, publishDate: { lte: $nowDate } }
      }
      limit: 3
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
          pid
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
