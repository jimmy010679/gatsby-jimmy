import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import { useQueryParams, StringParam } from "use-query-params"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"
import Breadcrumb from "/src/components/common/bread/breadcrumb"

import Container from "@mui/material/Container"
import * as styles from "./portfolio.module.css"

import "swiper/swiper.scss"

const PortfolioList = ({ location, data }) => {
  // ------------------------------------------------------------------------------------------------
  const pageQuery = usePageQuery()

  // 網址分類參數
  const queryCategory = pageQuery.parameter.queryCategory

  // ------------------------------------------------------------------------------------------------
  // 作品分類
  const portfolioCategory = data.settingCategory.nodes

  // ------------------------------------------------------------------------------------------------
  const [portfolios /*, setPortfolios*/] = usePortfolios({
    data: data.portfolio.nodes,
    portfolioCategory: portfolioCategory,
    queryCategory: queryCategory,
  })

  // ------------------------------------------------------------------------------------------------

  return (
    <Layout path={location.pathname}>
      <Seo title="作品集" isShowSiteName={true} description="作品集列表" />
      <Container maxWidth="lg">
        <div className={styles.portfolioContainer}>
          <Breadcrumb
            data={[
              {
                title: "作品集",
                link: "/portfolio/",
              },
            ]}
          />
          <h1>作品集</h1>
          <div className={styles.category}>
            <ul>
              <li>
                <Link
                  to="/portfolio/"
                  className={
                    typeof queryCategory === "undefined" ? styles.active : ""
                  }
                  title="全部"
                >
                  全部
                </Link>
              </li>
              {portfolioCategory.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/portfolio/?category=${item.name_English}`}
                    className={
                      queryCategory === item.name_English ? styles.active : ""
                    }
                    title={item.name_Chinese}
                  >
                    {item.name_Chinese}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.works}>
            {Array.isArray(portfolios) &&
              portfolios.map((item, index) => (
                <div className={styles.box} key={item.frontmatter.id}>
                  <Link
                    to={`/portfolio/${item.frontmatter.urlTitle}/`}
                    title={item.frontmatter.title}
                  >
                    <div className={styles.cover}>
                      <GatsbyImage
                        image={getImage(item.frontmatter.cover)}
                        alt={item.frontmatter.title}
                      />
                    </div>
                    <div className={styles.title}>{item.frontmatter.title}</div>
                    <div className={styles.category}>
                      {
                        portfolioCategory.find(
                          x => x.cid === item.frontmatter.cid
                        ).name_Chinese
                      }
                    </div>
                  </Link>
                </div>
              ))}

            {portfolios === null && <div>無資料</div>}

            {portfolios === "error" && <div>error</div>}
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default PortfolioList

// -------------------------------------------------------------------------------------------------------------------------------

export const queryPortfolioListData = graphql`
  query portfolioListQuery($nowDate: Date!) {
    settingCategory: allSettingPortfolioJson {
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
                width: 500
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
