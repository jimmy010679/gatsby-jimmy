import React from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Seo from "../../components/Common/Seo"
import Layout from "../../components/Layout"

import { Container, Grid } from "@material-ui/core"

import "swiper/swiper.scss"

const Portfolio = ({ location, data }) => {
  return (
    <Layout path={location.pathname}>
      <Seo />
      <div className="protfolio">
        <Container maxWidth="lg">
          <h2>作品集</h2>
          <Grid container spacing={3}>
            {data?.portfolio?.nodes.map((item, index) => (
              <Grid item xs={6} lg={4} key={item.frontmatter.id}>
                <Link to={`/portfolio/${item.frontmatter.id}/`}>
                  <p>{item.frontmatter.title}</p>
                  <div>
                    <GatsbyImage
                      image={getImage(item.frontmatter.cover)}
                      alt={item.frontmatter.title}
                    />
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Layout>
  )
}

export default Portfolio

export const queryIndexData = graphql`
  query {
    portfolio: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/portfolio/" }
        frontmatter: { published: { eq: true } }
      }
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
