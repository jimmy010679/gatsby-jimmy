const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryArticle = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { order: ASC, fields: id }
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

  if (queryArticle?.data?.allMarkdownRemark?.nodes) {
    for (const article of queryArticle.data.allMarkdownRemark.nodes) {
      createPage({
        path: `/article/${article.frontmatter.id}/`,
        component: path.resolve(`src/templates/article/index.js`),
        context: {
          id: article.frontmatter.id,
          title: article.frontmatter.title,
          cover: article.frontmatter.cover,
          content: article.html,
        },
      })
    }
  }
}
