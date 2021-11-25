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
    siteName: `幻想吉米`,
    description: ` 吉米的部落格！紀錄程式、模型、ACG及生活點點滴滴`,
    siteUrl: `https://kyjhome.com`,
    url: `https://kyjhome.com`,
    image: ``,
    fb_app_id: ``,
  },

  plugins: [
    /* 遠程 Git repositories 資料 */
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `gatsby-jimmy-data`,
        remote: `https://github.com/jimmy010679/gatsby-jimmy-data.git`,
        branch: process.env.DATA_SOURCE_BRANCH,
      },
    },

    /* image */
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    /* markdown */
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            /* 忽略檔案 其餘進行copy (gif) */
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: "static",
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          {
            /* 程式高亮 */
            resolve: "gatsby-remark-prismjs",
          },
          {
            /* 圖片優化 */
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },

    /* json */
    `gatsby-transformer-json`,

    /* 讀取本地file - images */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images/`,
      },
    },

    /* 讀取本地file - markdown/setting */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/`,
      },
    },

    /* sass SCSS */
    `gatsby-plugin-sass`,

    /* query-string, use-query-params */
    `gatsby-plugin-use-query-params`,

    /* 
      Page Metadata 
      gatsby-plugin-react-helmet, react-helmet
    */
    `gatsby-plugin-react-helmet`,

    /* material-ui */
    `gatsby-plugin-material-ui`,

    /* gatsby-plugin-manifest */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `幻想吉米`,
        short_name: `幻想吉米`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#ebedf7`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },

    /* SiteMap */
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
      },
    },
  ],
}
