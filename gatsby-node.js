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
            tags
          }
          html
        }
      }
    }
  `)

  // -----------------------------------------------------------------------------------------------------------------------
  // ALL blog article
  const articles = queryArticle.data.allMarkdownRemark.nodes

  // -----------------------------------------------------------------------------------------------------------------------
  // createPage
  // build 分頁列表
  // /blog/` || `/blog/2/
  const postsPerPage = 10
  const numPages = Math.ceil(articles.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve(`src/templates/blog/blogPagination.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPages,
        currentPage: i + 1,
      },
    })
  })

  // -----------------------------------------------------------------------------------------------------------------------
  // tags 陣列
  let tagsArray = []

  // tags 陣列轉成物件
  /*
    {
      icash: 2,
      '周邊': 2,
      '開箱': 12
    }
  */
  let tagsObject = {}

  for (const article of articles) {
    // --------------------------------------------------------------------
    // createPage
    // build blog article pages
    // /blog/article/${id}/
    createPage({
      path: `/blog/article/${article.frontmatter.id}/`,
      component: path.resolve(`src/templates/blog/article/index.js`),
      context: {
        id: article.frontmatter.id,
        title: article.frontmatter.title,
        cover: article.frontmatter.cover,
        tags: article.frontmatter.tags,
        content: article.html,
      },
    })

    // --------------------------------------------------------------------
    // tags array push (該陣列可能有重覆)
    article.frontmatter.tags.forEach(function (tag) {
      tagsArray.push(tag)
    })
    // --------------------------------------------------------------------
  }

  // 計算tags每個字串分別總數
  // 陣列轉成物件
  for (let i = 0, j = tagsArray.length; i < j; i++) {
    if (tagsObject[tagsArray[i]]) {
      tagsObject[tagsArray[i]]++
    } else {
      tagsObject[tagsArray[i]] = 1
    }
  }

  // createPage
  // build tags pages
  // /blog/tag/${name}/
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
    /*createPage({
      path: `/blog/tag/${name}/`,
      component: path.resolve(`src/templates/blog/tag/BlogTagPagination.js`),
      context: {
        name: name,
      },
    })*/
  })

  // -----------------------------------------------------------------------------------------------------------------------
}
