const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const findDuplicates = arr =>
    arr.filter((item, index) => arr.indexOf(item) === index)

  // query blog文章
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

  // build 列表
  const articles = queryArticle.data.allMarkdownRemark.nodes
  const postsPerPage = 10
  const numPages = Math.ceil(articles.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve(`src/templates/blog/blogPagination.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  let tagsArray = []

  for (const article of articles) {
    // build blog文章
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

    // get tags array
    article.frontmatter.tags.forEach(function (tag) {
      tagsArray.push(tag)
    })

    // build tags
    tagsArray.forEach(function (name, i) {
      createPage({
        path: `/blog/tag/${name}/`,
        component: path.resolve(`src/templates/blog/tag/BlogTagPagination.js`),
        context: {
          name: name,
        },
      })
    })
  }
}
