import React, { useEffect } from "react"
import { Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"
//import Breadcrumb from "/src/components/common/bread/breadcrumb.js"

import RemoveHTML from "/src/components/common/function/removeHTML"
import SubString from "/src/components/common/function/subString"

import Container from "@mui/material/Container"
import * as styles from "./article.module.css"

const Article = ({ pageContext, location }) => {
  // ------------------------------------------------------------------------------------------------

  const {
    //id,
    //urlTitle,
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

  const echoDescription = description
    ? SubString({
        str: description,
        n: 200,
        hasDot: true,
      })
    : SubString({
        str: RemoveHTML({ html: content }),
        n: 200,
        hasDot: true,
      })

  useEffect(() => {
    //let doc = new DOMParser().parseFromString(content, "text/html")
    //console.log(doc.querySelectorAll("h2"))
  }, [content])
  // ------------------------------------------------------------------------------------------------

  // return
  return (
    <Layout path={location.pathname}>
      <Seo
        title={`${title} / 部落格`}
        isShowSiteName={true}
        description={echoDescription}
        cover={cover}
        type="article"
        publishedTime={publishDate}
        modifiedTime={updateDate}
      />

      <article id={styles.article}>
        <div className={styles.header}>
          <Container maxWidth="md">
            <div className={styles.containerFlex}>
              <div className={styles.info}>
                <h1>{title}</h1>

                <div className={styles.type}>
                  文章分類：
                  <Link to={`/blog/category/${name_English}/`}>
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
                <div className={styles.description}>{echoDescription}</div>
              </div>
              <div className={styles.cover}>
                {cover ? (
                  <GatsbyImage
                    image={getImage(cover.childrenImageSharp[0])}
                    alt="封面圖片"
                  />
                ) : (
                  <>無圖片</>
                )}
              </div>
            </div>
          </Container>
        </div>

        <Container maxWidth="md">
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
        </Container>
      </article>
    </Layout>
  )
}

export default Article
