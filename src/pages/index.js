import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Seo from "../components/Common/Seo"
import Layout from "../components/Layout"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.scss"

const Home = ({ location, data }) => {
  return (
    <Layout path={location.pathname}>
      <Seo isShowSiteName={false} />

      <div className="blogNews">
        <Container maxWidth="lg">
          <h2>最新文章</h2>
          <Link to="/blog/">看更多</Link>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <div className="new">
                <div>
                  {data?.articles.nodes[0] && (
                    <>
                      <Link
                        to={`/blog/article/${data.articles.nodes[0].frontmatter.id}/`}
                      >
                        <GatsbyImage
                          image={getImage(
                            data.articles.nodes[0].frontmatter.cover
                          )}
                          alt={data.articles.nodes[0].frontmatter.title}
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/blog/article/${data.articles.nodes[0].frontmatter.id}/`}
                        >
                          {data.articles.nodes[0].frontmatter.title}
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Grid container spacing={0} alignItems="stretch">
                <Grid item xs={6} lg={6}>
                  <div></div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
                <Link to={`/portfolio/${item.frontmatter.id}/`}>
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

export const queryIndexData = graphql`
  query {
    articles: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/blog/" }
        frontmatter: { published: { eq: true } }
      }
      limit: 5
      sort: { order: DESC, fields: [frontmatter___id] }
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

    portfolio: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/portfolio/" }
        frontmatter: { published: { eq: true } }
      }
      limit: 5
      sort: { order: DESC, fields: [frontmatter___id] }
    ) {
      nodes {
        frontmatter {
          id
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
