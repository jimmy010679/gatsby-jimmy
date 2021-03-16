import React from "react"
import { graphql } from "gatsby"

import { getImage, GatsbyImage } from "gatsby-plugin-image"

import SEO from "../components/Common/SEO"
import Layout from "../components/Layout"

import { Container, Grid, Button, Paper } from "@material-ui/core"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.scss"

const Home = ({ location, data }) => {
  return (
    <Layout path={location.pathname}>
      <SEO />

      <div className="blogNews">
        <Container maxWidth="lg">
          <h2>最新文章</h2>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <div className="new">
                <div>
                  {data?.allMarkdownRemark?.nodes[0] && (
                    <>
                      <div>
                        {data.allMarkdownRemark.nodes[0].frontmatter.id}
                        {data.allMarkdownRemark.nodes[0].frontmatter.title}
                      </div>
                      <GatsbyImage
                        image={getImage(
                          data.allMarkdownRemark.nodes[0].frontmatter.cover
                        )}
                        alt="aaa"
                      />
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

export const queryNewArticle = graphql`
  query {
    allMarkdownRemark(
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
              gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
        html
      }
    }
  }
`
