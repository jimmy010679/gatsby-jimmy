import React from "react"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

import { Helmet } from "react-helmet"

const SEO = ({ title, description, image }) => {
  const { pathname } = useLocation()

  const siteData = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          title
          siteName
          titleTemplate
          description
          siteUrl
          url
          image
          fb_app_id
        }
      }
    }
  `)

  const site = siteData.site.siteMetadata

  const seo = {
    title: title || site.title,
    description: description || site.description,
    image: `${site.siteUrl}${image || site.image}`,
    url: `${site.siteUrl}${pathname}`,
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

export default SEO
