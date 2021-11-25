import React from "react"
import { Link } from "gatsby"

import Seo from "/src/components/common/seo"
import RemoveHTML from "/src/components/common/function/removeHTML"
import SubString from "/src/components/common/function/subString"

import Layout from "/src/components/layout"

import Container from "@mui/material/Container"
import * as styles from "./article.module.css"

const Article = ({ pageContext, location }) => {
  const {
    title,
    content,
    cover,
    name_English,
    name_Chinese,
    publishDate,
    updateDate,
    tags,
    description,
  } = pageContext

  // ------------------------------------------------------------------------------------------------
  // return
  return (
    <Layout path={location.pathname}>
      <Seo
        title={title}
        isShowSiteName={true}
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
        cover={cover}
        type="article"
        publishedTime={publishDate}
        modifiedTime={updateDate}
      />
      <Container maxWidth="md">
        <div className={styles.main}>
          <h1>{title}</h1>
          <div>
            分類:
            <Link to={`/blog/category/${name_English}/`}>{name_Chinese}</Link>
          </div>
          <div>
            <div>
              發布日期<span>{publishDate}</span>
            </div>
            {updateDate !== publishDate && (
              <div>
                更新日期 <span>{updateDate}</span>
              </div>
            )}
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          <div>
            <ul>
              {tags.map((tag, i) => (
                <li property="article:tag" key={i}>
                  <Link to={`/blog/tag/${tag}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Article
