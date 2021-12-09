import React, { useEffect } from "react"
import { Link } from "gatsby"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"
import Breadcrumb from "/src/components/common/bread/breadcrumb.js"

import RemoveHTML from "/src/components/common/function/removeHTML"
import SubString from "/src/components/common/function/subString"

import Container from "@mui/material/Container"
import * as styles from "./article.module.css"

const Article = ({ pageContext, location }) => {
  // ------------------------------------------------------------------------------------------------

  const {
    //id,
    urlTitle,
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

  useEffect(() => {
    let doc = new DOMParser().parseFromString(content, "text/html")

    console.log(doc.querySelectorAll("h2"))
  }, [content])
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
        <article id={styles.article}>
          <Breadcrumb
            data={[
              {
                title: "部落格",
                link: "/blog/",
              },
              {
                title: title,
                link: `/blog/article/${urlTitle}/`,
              },
            ]}
          />
          <h1>{title}</h1>
          <div className={styles.header}>
            <div className={styles.type}>
              文章分類：
              <Link to={`/blog/category/${name_English}/`}>{name_Chinese}</Link>
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
          ></div>
          <div className={styles.tags}>
            <ul>
              {tags.map((tag, i) => (
                <li property="article:tag" key={i}>
                  <Link to={`/blog/tag/${tag}/`} title={tag}>
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Container>
    </Layout>
  )
}

export default Article
