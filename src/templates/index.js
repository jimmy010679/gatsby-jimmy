import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Seo from "/src/components/common/seo"
import Layout from "/src/components/layout"

import Container from "@mui/material/Container"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.scss"
import * as styles from "./index.module.css"

const Home = ({ location, data }) => {
  console.log(data.articles.nodes[0].frontmatter.cover)
  return (
    <Layout path={location.pathname}>
      <Seo isShowSiteName={false} />
      <div className={styles.blogNews}>
        <Container maxWidth="lg">
          <div className={styles.content}>
            <div className={styles.head}>
              <h2>最新文章</h2>
              <Link to="/blog/">看更多</Link>
            </div>
            <div className="new">
              <div>
                {data?.articles.nodes[0] && (
                  <>
                    <Link
                      to={`/blog/article/${data.articles.nodes[0].frontmatter.urlTitle}/`}
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
                    <div>
                      <Link
                        to={`/blog/article/${data.articles.nodes[0].frontmatter.urlTitle}/`}
                      >
                        {data.articles.nodes[0].frontmatter.title}
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="protfolio">
        <Container maxWidth="lg">
          <h2>作品集</h2>
          <Link to="/portfolio/">看更多</Link>
          <Swiper
            spaceBetween={15}
            slidesPerView={3.3}
            onSlideChange={() => console.log("slide change")}
          >
            {data?.portfolio?.nodes.map((item, index) => (
              <SwiperSlide key={item.frontmatter.id}>
                <Link to={`/portfolio/${item.frontmatter.urlTitle}/`}>
                  <p>{item.frontmatter.title}</p>
                  <div>
                    <GatsbyImage
                      image={getImage(item.frontmatter.cover)}
                      alt={item.frontmatter.title}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
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
      limit: 5
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

    portfolio: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/portfolio/" }
        frontmatter: { published: { eq: true }, publishDate: { lte: $nowDate } }
      }
      limit: 5
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
