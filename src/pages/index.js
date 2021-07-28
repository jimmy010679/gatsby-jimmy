import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Seo from "../components/Common/Seo"
import Layout from "../components/Layout"

import { Container, Grid, Button, Paper } from "@material-ui/core"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.scss"

const Home = ({ location, data }) => {
  console.log(data.articles)
  return (
    <Layout path={location.pathname}>
      <Seo />

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
                          alt="aaa"
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
          <Swiper
            spaceBetween={15}
            slidesPerView={3.3}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
          </Swiper>
          <Button color="primary">Hello World</Button>
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
        html
      }
    }
  }
`
