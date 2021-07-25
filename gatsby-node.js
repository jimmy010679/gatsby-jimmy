const { constants } = require("buffer")
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // -----------------------------------------------------------------------------------------------------------------------
  // query blog article pages
  const queryArticle = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/blog/" }
          frontmatter: { published: { eq: true } }
        }
        sort: { order: ASC, fields: frontmatter___id }
      ) {
        nodes {
          frontmatter {
            id
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
          }
          html
        }
      }
    }
  `)

  // query category setting
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

  // query portfolio setting
  /*const querySettingPortfolio = await graphql(`
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
  `)*/

  // -----------------------------------------------------------------------------------------------------------------------
  // ALL blog article
  const articles = queryArticle.data.allMarkdownRemark.nodes

  // -----------------------------------------------------------------------------------------------------------------------
  // createPage
  // blog Pagination
  const postsPerPage = 10
  const numPages = Math.ceil(articles.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve(`src/templates/blog/BlogPagination.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPages,
        currentPage: i + 1,
      },
    })
  })

  // -----------------------------------------------------------------------------------------------------------------------
  // createPage
  // blog category pages

  // category 陣列
  let category = querySettingCategory.data.allSettingCategoryJson.nodes

  // 計算count文章筆數
  for (const article of articles) {
    category.find(x => x.cid === article.frontmatter.cid).count++
  }

  for (const item of category) {
    let category_count = item.count
    let category_postsPerPage = 10
    let category_numPages = Math.ceil(category_count / category_postsPerPage)

    Array.from({ length: category_numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/blog/category/${item.name_English}/`
            : `/blog/category/${item.name_English}/${i + 1}/`,
        component: path.resolve(
          `src/templates/blog/category/BlogCategoryPagination.js`
        ),
        context: {
          cid: item.cid,
          name_English: item.name_English,
          name_Chinese: item.name_Chinese,
          limit: category_postsPerPage,
          skip: i * category_postsPerPage,
          numPages: category_numPages,
          currentPage: i + 1,
        },
      })
    })
  }

  // -----------------------------------------------------------------------------------------------------------------------
  // createPage
  // blog tags pages

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
    let tag_postsPerPage = 10
    let tag_numPages = Math.ceil(tag_articles / tag_postsPerPage)

    Array.from({ length: tag_numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog/tag/${name}/` : `/blog/tag/${name}/${i + 1}/`,
        component: path.resolve(`src/templates/blog/tag/BlogTagPagination.js`),
        context: {
          name: name,
          limit: tag_postsPerPage,
          skip: i * tag_postsPerPage,
          numPages: tag_numPages,
          currentPage: i + 1,
        },
      })
    })
  })

  // -----------------------------------------------------------------------------------------------------------------------
  // createPage
  // blog article pages
  for (const article of articles) {
    // 查找該文章的 category Name
    let tempCategory = category.find(x => x.cid === article.frontmatter.cid)

    createPage({
      path: `/blog/article/${article.frontmatter.id}/`,
      component: path.resolve(`src/templates/blog/article/index.js`),
      context: {
        id: article.frontmatter.id,
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

  // -----------------------------------------------------------------------------------------------------------------------
  // createPage
  // portfolio pages

  // -----------------------------------------------------------------------------------------------------------------------
}
