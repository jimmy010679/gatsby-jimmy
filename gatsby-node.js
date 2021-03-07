const path = require(`path`)

/*
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryArticle = await graphql(`
    query {
      allContentfulBlog {
        edges {
          node {
            category
            aid
            tags
            title
            updatedAt
            publishDate
            content {
              childMarkdownRemark {
                excerpt(format: PLAIN)
                html
              }
            }
          }
        }
        totalCount
      }
    }
  `)
  for (const article of queryArticle.data.allContentfulBlog.edges) {
    createPage({
      path: `/article/${article.node.aid}/`,
      component: path.resolve(`src/templates/article/index.js`),
      context: {
        aid: article.node.aid,
        title: article.node.title,
        content: article.node.content,
        cover: article.node.cover,
        //content: article.node.content.content,
      },
    })
    console.log("article:" + article.node.aid)
  }
}
*/
