import React from "react"
import PropTypes from "prop-types"

import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

import { Helmet } from "react-helmet"

const Seo = ({ title, description, image }) => {
  const { pathname } = useLocation()

  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    defaultDescription,
    defaultImage,
    siteUrl,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet title={seo.title}>
      <meta charSet="utf-8" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
    </Helmet>
  )
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}

export default Seo

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        defaultImage: image
        siteName
        titleTemplate
        siteUrl
        url
        fb_app_id
      }
    }
  }
`
