/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const RemoveHTML = require("./src/components/common/function/removeHTML")
const SubString = require("./src/components/common/function/subString")
const {
  GetDateTime,
  ConversionDateTime,
} = require("./src/components/common/function/getDateTime")

/** 
  自定義環境變量
  開發 .env.development
  正式 .env.production
  https://www.gatsbyjs.com/docs/environment-variables
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// 取得今日Taipei Date
const nowDate = GetDateTime({
  type: "today",
  format: "yyyy-mm-dd 00:00:00",
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
              linkImagesToOriginal: false, // 添加a連結
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

    /* RSS */
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteName
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(edge => {
                let tempDescription = edge.frontmatter.description
                  ? SubString({
                      str: edge.frontmatter.description,
                      n: 200,
                      hasDot: true,
                    })
                  : SubString({
                      str: RemoveHTML({ html: edge.html }),
                      n: 200,
                      hasDot: true,
                    })

                return Object.assign({}, edge.frontmatter, {
                  description: tempDescription,
                  date: edge.frontmatter.publishDate,
                  custom_elements: [
                    {
                      updated: ConversionDateTime({
                        date: edge.frontmatter.updateDate,
                        oldType: "yyyy-mm-dd hh:mm:ss",
                        newType: "GMT",
                      }),
                    },
                  ],
                  url: `${site.siteMetadata.siteUrl}/blog/article/${edge.frontmatter.urlTitle}/`,
                  guid: `${site.siteMetadata.siteUrl}/blog/article/${edge.frontmatter.urlTitle}/`,
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {
                    fileAbsolutePath: { regex: "/content/blog/" }
                    frontmatter: {
                      published: { eq: true }
                      publishDate: { lte: "${nowDate}" }
                    }
                  }
                  sort: { 
                    order: ASC,
                    fields: [
                      frontmatter___updateDate,
                      frontmatter___publishDate,
                      frontmatter___id
                    ] 
                  }
                ) {
                  nodes {
                    frontmatter {
                      id
                      urlTitle
                      title
                      publishDate
                      updateDate
                      description
                    }
                    html
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "幻想吉米 RSS",
          },
        ],
      },
    },

    /* GTM */
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-5FJWMKB",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
      },
    },
  ],
}
