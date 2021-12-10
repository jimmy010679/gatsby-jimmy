// ---------------------------------------------------------------------------------------------------------------------------------------------
// 套件

//const { constants } = require("buffer")
const path = require(`path`)

const { getDateTime } = require("./src/components/common/function/getDateTime")

// ---------------------------------------------------------------------------------------------------------------------------------------------
// 全局變數

// 取得今日Taipei Date
const nowDate = getDateTime({
  type: "today",
  format: "yyyy-mm-dd 00:00:00",
})

// ---------------------------------------------------------------------------------------------------------------------------------------------

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  /* -----------------------------------------------------------------------------------------------------
   * query blog article
   *
   */
  const queryArticles = await graphql(`
    query {
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
            cover {
              childrenImageSharp {
                gatsbyImageData(
                  width: 1200
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            cid
            publishDate
            updateDate
            tags
            description
          }
          html
        }
      }
    }
  `)

  /* -----------------------------------------------------------------------------------------------------
   * query portfolios
   *
   */
  const queryPortfolios = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/portfolio/" }
          frontmatter: {
            published: { eq: true }
            publishDate: { lte: "${nowDate}" }
          }
        }
        sort: {
          order: DESC
          fields: [
            frontmatter___updateDate
            frontmatter___publishDate
            frontmatter___id
          ]
        }
      ) {
        nodes {
          frontmatter {
            id
            urlTitle
            title
            cover {
              childrenImageSharp {
                gatsbyImageData(
                  width: 1200
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            pid
            publishDate
            updateDate
            description
          }
          html
        }
      }
    }
  `)

  /* -----------------------------------------------------------------------------------------------------
   * query category setting
   */
  const querySettingCategory = await graphql(`
    query {
      allSettingCategoryJson {
        nodes {
          cid
          name_English
          name_Chinese
          count
        }
      }
    }
  `)

  /* -----------------------------------------------------------------------------------------------------
   * query portfolio setting
   */
  const querySettingPortfolio = await graphql(`
    query {
      allSettingPortfolioJson {
        nodes {
          pid
          name_English
          name_Chinese
          count
        }
      }
    }
  `)

  /* -----------------------------------------------------------------------------------------------------
   * all blog article
   *
   */
  const articles = queryArticles.data.allMarkdownRemark.nodes

  // blog category分類 陣列
  const blogCategory = querySettingCategory.data.allSettingCategoryJson.nodes

  /* -----------------------------------------------------------------------------------------------------
   * all portfolio data
   *
   */
  const portfolios = queryPortfolios.data.allMarkdownRemark.nodes

  // portfolio category分類 陣列
  const portfolioCategory =
    querySettingPortfolio.data.allSettingPortfolioJson.nodes

  /* -----------------------------------------------------------------------------------------------------
   * createPage
   *
   * /blog/:page?/
   */

  // 計算count文章筆數
  for (const article of articles) {
    blogCategory.find(x => x.cid === article.frontmatter.cid).count++
  }

  // 每頁筆數
  const postsPerPage = 10

  // 總頁數
  const numPages = Math.ceil(articles.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve(`src/templates/blog/blogPagination.js`),
      context: {
        // ---------------------------------
        nowDate: nowDate,
        count: articles.length,
        limit: postsPerPage,
        skip: i * postsPerPage,
        // ---------------------------------
        numPages: numPages,
        currentPage: i + 1,
        // ---------------------------------
        blogCategory: blogCategory,
        // ---------------------------------
      },
    })
  })

  /* -----------------------------------------------------------------------------------------------------
   * createPage
   *
   * /blog/category/:name_English/:page?/
   */

  for (const item of blogCategory) {
    // 此分類筆數
    let category_count = item.count

    // 每頁筆數
    let category_postsPerPage = 10

    // 總頁數
    let category_numPages = Math.ceil(category_count / category_postsPerPage)

    Array.from({ length: category_numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/blog/category/${item.name_English}/`
            : `/blog/category/${item.name_English}/${i + 1}/`,
        component: path.resolve(
          `src/templates/blog/category/blogCategoryPagination.js`
        ),
        context: {
          // ---------------------------------
          nowDate: nowDate,
          count: category_count,
          cid: item.cid,
          limit: category_postsPerPage,
          skip: i * category_postsPerPage,
          // ---------------------------------
          name_English: item.name_English,
          name_Chinese: item.name_Chinese,
          numPages: category_numPages,
          currentPage: i + 1,
          // ---------------------------------
          blogCategory: blogCategory,
          // ---------------------------------
        },
      })
    })
  }

  /* -----------------------------------------------------------------------------------------------------
   * createPage
   *
   * /blog/tag/:name/:page?/
   */

  // tags 陣列
  let tagsArray = []

  // tags array push (該陣列可能有重覆)
  for (const article of articles) {
    article.frontmatter.tags.forEach(function (tag) {
      tagsArray.push(tag)
    })
  }

  // tags 陣列轉成物件
  /*
    {
      icash: 2,
      '周邊': 2,
      '開箱': 12
    }
  */
  let tagsObject = {}

  // 計算tags每個字串分別總數
  // 陣列轉成物件
  for (let i = 0, j = tagsArray.length; i < j; i++) {
    if (tagsObject[tagsArray[i]]) {
      tagsObject[tagsArray[i]]++
    } else {
      tagsObject[tagsArray[i]] = 1
    }
  }

  // build 所有tag頁面
  // 如有分頁也一併建立
  Object.keys(tagsObject).forEach(function (name, x) {
    let tag_articles = tagsObject[name]

    // 每頁筆數
    let tag_postsPerPage = 10

    // 總頁數
    let tag_numPages = Math.ceil(tag_articles / tag_postsPerPage)

    Array.from({ length: tag_numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog/tag/${name}/` : `/blog/tag/${name}/${i + 1}/`,
        component: path.resolve(`src/templates/blog/tag/blogTagPagination.js`),
        context: {
          // ---------------------------------
          nowDate: nowDate,
          count: tag_articles,
          name: name,
          limit: tag_postsPerPage,
          skip: i * tag_postsPerPage,
          // ---------------------------------
          numPages: tag_numPages,
          currentPage: i + 1,
          // ---------------------------------
          blogCategory: blogCategory,
          // ---------------------------------
        },
      })
    })
  })

  /* -----------------------------------------------------------------------------------------------------
   * createPage
   *
   * /blog/article/:urlTitle/
   */

  for (const article of articles) {
    // 查找該文章的 category Name
    let tempCategory = blogCategory.find(x => x.cid === article.frontmatter.cid)

    createPage({
      path: `/blog/article/${article.frontmatter.urlTitle}/`,
      component: path.resolve(`src/templates/blog/article/article.js`),
      context: {
        id: article.frontmatter.id,
        urlTitle: article.frontmatter.urlTitle,
        title: article.frontmatter.title,
        cover: article.frontmatter.cover,
        name_English: tempCategory.name_English,
        name_Chinese: tempCategory.name_Chinese,
        publishDate: article.frontmatter.publishDate,
        updateDate: article.frontmatter.updateDate,
        tags: article.frontmatter.tags,
        content: article.html,
      },
    })
  }

  /* -----------------------------------------------------------------------------------------------------
   * createPage
   *
   * /portfolio/:urlTitle/
   */

  for (const portfolio of portfolios) {
    // 查找該文章的 category Name
    let tempCategory = portfolioCategory.find(
      x => x.cid === portfolio.frontmatter.cid
    )

    createPage({
      path: `/portfolio/${portfolio.frontmatter.urlTitle}/`,
      component: path.resolve(`src/templates/portfolio/work/work.js`),
      context: {
        id: portfolio.frontmatter.id,
        urlTitle: portfolio.frontmatter.urlTitle,
        title: portfolio.frontmatter.title,
        cover: portfolio.frontmatter.cover,
        name_English: tempCategory.name_English,
        name_Chinese: tempCategory.name_Chinese,
        publishDate: portfolio.frontmatter.publishDate,
        updateDate: portfolio.frontmatter.updateDate,
        description: portfolio.frontmatter.description,
        content: portfolio.html,
      },
    })
  }

  /* -----------------------------------------------------------------------------------------------------
   * createPage
   *
   * /
   * index 首頁
   */

  createPage({
    path: `/`,
    component: path.resolve(`src/templates/index.js`),
    context: {
      nowDate: nowDate,
    },
  })

  /* -----------------------------------------------------------------------------------------------------
   * createPage
   *
   * /portfolio/
   * 作品頁
   */

  createPage({
    path: `/portfolio/`,
    component: path.resolve(`src/templates/portfolio/portfolio.js`),
    context: {
      nowDate: nowDate,
    },
  })

  // -----------------------------------------------------------------------------------------------------
}
