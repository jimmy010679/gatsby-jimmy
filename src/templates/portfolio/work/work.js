import React from "react"
import { Link } from "gatsby"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"
import Breadcrumb from "/src/components/common/bread/breadcrumb.js"

import RemoveHTML from "/src/components/common/function/removeHTML"
import SubString from "/src/components/common/function/subString"

import Container from "@mui/material/Container"
import * as styles from "./work.module.css"

const Work = ({ pageContext, location }) => {
  const {
    //id,
    urlTitle,
    title,
    content /*, cover*/,
    name_English,
    name_Chinese,
    publishDate,
    updateDate,
    description,
  } = pageContext

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout path={location.pathname}>
      <Seo
        title={`${title} / 作品集`}
        description={
          description
            ? SubString({
                str: description,
                n: 100,
                hasDot: true,
              })
            : SubString({
                str: RemoveHTML({ html: content }),
                n: 100,
                hasDot: true,
              })
        }
        isShowSiteName={true}
        BreadcrumbList={[
          {
            link: `/portfolio/`,
            name: "作品集",
          },
          {
            link: `/portfolio/${urlTitle}/`,
            name: title,
          },
        ]}
      />
      <Container maxWidth="md">
        <div className={styles.workContainer}>
          <Breadcrumb
            data={[
              {
                title: "作品集",
                link: "/portfolio/",
              },
              {
                title: title,
                link: `/portfolio/${urlTitle}/`,
              },
            ]}
          />
          <h1>{title}</h1>
          <div className={styles.header}>
            <div className={styles.type}>
              作品分類：
              <Link to={`/portfolio/?category=${name_English}`}>
                {name_Chinese}
              </Link>
            </div>
            <div className={styles.publishDate}>
              發布日期：<span>{publishDate}</span>
            </div>
            {updateDate !== publishDate && (
              <div className={styles.updateDate}>
                更新日期：<span>{updateDate}</span>
              </div>
            )}
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <div></div>
        </div>
      </Container>
    </Layout>
  )
}

export default Work
