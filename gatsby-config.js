/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

/** 
  自定義環境變量
  開發 .env.development
  正式 .env.production
  https://www.gatsbyjs.com/docs/environment-variables
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `幻想吉米`,
    siteName: `幻想吉米`,
    titleTemplate: `%s - 幻想吉米`,
    description: ` 吉米的部落格！紀錄程式、模型、ACG及生活點點滴滴`,
    siteUrl: `https://kyjhome.com`,
    url: `https://kyjhome.com`,
    image: ``,
    fb_app_id: ``,
  },

  plugins: [
    /* SiteMap */
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },

    /* contentful */
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `k231co3h64tm`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },

    /* 讀取本地file */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/`,
      },
    },

    /* markdown  */
    `gatsby-transformer-remark`,

    // sass SCSS
    `gatsby-plugin-sass`,

    /* query-string, use-query-params */
    `gatsby-plugin-use-query-params`,

    /* 
      Page Metadata 
      gatsby-plugin-react-helmet, react-helmet
    */
    `gatsby-plugin-react-helmet`,
  ],
}
