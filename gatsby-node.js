const path = require(`path`)

// fix develop f12 error messages
// https://github.com/gatsbyjs/gatsby/issues/11934
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    })
  }
}

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
        content: article.node.content.childMarkdownRemark.html,
      },
    })
    console.log("article:" + article.node.aid)
  }
}
