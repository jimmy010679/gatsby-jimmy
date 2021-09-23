import React from "react"
import PropTypes from "prop-types"

import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

import { Helmet } from "react-helmet"

const Seo = ({
  title = "",
  isShowSiteName = true,
  description = "",
  image = "",
}) => {
  const { pathname } = useLocation()

  const { site } = useStaticQuery(query)

  const { siteName, defaultDescription, defaultImage, siteUrl } =
    site.siteMetadata

  const seo = {
    title: isShowSiteName ? `${title} - ${siteName}` : siteName,
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
        siteName
        defaultDescription: description
        defaultImage: image
        siteUrl
        url
        fb_app_id
      }
    }
  }
`
