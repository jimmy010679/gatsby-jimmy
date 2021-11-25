import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import { useQueryParams, StringParam } from "use-query-params"

import Seo from "/src/components/common/seo"
import Layout from "/src/components/layout"

import Container from "@mui/material/Container"

import "swiper/swiper.scss"

const PortfolioList = ({ location, data }) => {
  //---------------------------------------------------------
  const pageQuery = usePageQuery()

  //---------------------------------------------------------
  const [portfolios /*, setPortfolios*/] = usePortfolios({
    data: data.portfolio.nodes,
    portfolioCategory: data.portfolioCategory.nodes,
    queryCategory: pageQuery.parameter.queryCategory,
  })

  //---------------------------------------------------------

  return (
    <Layout path={location.pathname}>
      <Seo />
      <div className="protfolio">
        <Container maxWidth="lg">
          <h2>作品集</h2>
          <div>
            <Link to={`/portfolio/`}>全部</Link>
            {data.portfolioCategory.nodes.map((item, index) => (
              <Link
                to={`/portfolio/?category=${item.name_English}`}
                key={index}
              >
                {item.name_Chinese}
              </Link>
            ))}
          </div>
          <div>
            {Array.isArray(portfolios) && (
              <div>
                {portfolios.map((item, index) => (
                  <div key={item.frontmatter.id}>
                    <Link to={`/portfolio/${item.frontmatter.urlTitle}/`}>
                      <p>{item.frontmatter.title}</p>
                      <div>
                        <GatsbyImage
                          image={getImage(item.frontmatter.cover)}
                          alt={item.frontmatter.title}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {portfolios === null && <div>無資料</div>}

            {portfolios === "error" && <div>error</div>}
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default PortfolioList

// -------------------------------------------------------------------------------------------------------------------------------

export const queryPortfolioListData = graphql`
  query portfolioListQuery($nowDate: Date!) {
    portfolioCategory: allSettingPortfolioJson {
      nodes {
        pid
        name_English
        name_Chinese
        count
      }
    }

    portfolio: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/portfolio/" }
        frontmatter: { published: { eq: true }, publishDate: { lte: $nowDate } }
      }
      sort: {
        order: [DESC, DESC, DESC]
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
          pid
          cover {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP]
                width: 800
                aspectRatio: 1.77
              )
            }
          }
        }
      }
    }
  }
`

// -------------------------------------------------------------------------------------------------------------------------------
// Hooks
// QueryParams
const usePageQuery = () => {
  // 讀取 query
  const [query, setQuery] = useQueryParams({
    category: StringParam,
  })

  const { category: queryCategory } = query

  const handlePageQuery = queryCategory => {
    let temp = {
      queryCategory: undefined,
    }

    // ------------------------------------------------------
    // queryCategory
    if (queryCategory === undefined) {
      temp.queryCategory = undefined
    } else {
      temp.queryCategory = queryCategory
    }

    return temp
  }

  const pageQueryAfter = handlePageQuery(queryCategory)

  const parameter = {
    queryCategory: pageQueryAfter.queryCategory,
  }

  return {
    parameter: parameter,
    setQuery: setQuery,
  }
}

// -------------------------------------------------------------------------------------------------------------------------------
// PageTitle
const usePortfolios = ({ data, portfolioCategory, queryCategory }) => {
  const [portfolios, setPortfolios] = useState(undefined)

  useEffect(() => {
    let tempData = undefined

    if (queryCategory) {
      // 有 queryCategory

      // 檢查 queryCategory 合不合法
      let findPortfolioCategory = portfolioCategory.find(
        x => x.name_English === queryCategory
      )

      if (findPortfolioCategory) {
        // 合法

        // 篩選該類別的資料
        let filterData = data.filter(function (item, index, array) {
          return item.frontmatter.pid === findPortfolioCategory.pid
        })

        if (filterData.length > 0) {
          tempData = filterData
        } else {
          // 無資料
          tempData = null
        }
      } else {
        // 不合法
        tempData = "error"
      }
    } else {
      // 全部資料
      tempData = data
    }

    setPortfolios(tempData)
  }, [data, portfolioCategory, queryCategory])

  return [portfolios, setPortfolios]
}
