const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

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
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve(`src/templates/blog/blog-list-template.js`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // build blog文章
  for (const article of articles) {
    createPage({
      path: `/blog/article/${article.frontmatter.id}/`,
      component: path.resolve(`src/templates/blog/article/index.js`),
      context: {
        id: article.frontmatter.id,
        title: article.frontmatter.title,
        cover: article.frontmatter.cover,
        content: article.html,
      },
    })
  }
}
