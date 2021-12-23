import React from "react"

import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import formatTimeZone from "/src/components/common/function/formatTimeZone"

const SEO = ({
  /* -------------------------------------------------------------------------------------
   * 設定
   */

  // 使否顯示: xxxxxxx - 網站名
  isShowSiteName = true,

  /* -------------------------------------------------------------------------------------
   * 基本資訊
   */

  // 標題
  title = "",

  // 封面圖片
  cover = "",

  // 說明
  description = "",

  /* -------------------------------------------------------------------------------------
   * Open Graph protocol
   */

  // 類型
  type = "website", // website, article

  // 發布日期
  publishedTime = "",

  // 更新日期
  modifiedTime = "",
  // -------------------------------------------------------------------------------------
}) => {
  // ------------------------------------------------------------------------------------------------------------------------------
  // 讀取路徑
  const { pathname } = useLocation()

  // 基本設定預設資料
  const { site } = useStaticQuery(querySEO)
  const { siteName, defaultDescription, defaultImage, siteUrl } =
    site.siteMetadata

  const lang = "zh-Hant-TW"

  // ------------------------------------------------------------------------------------------------------------------------------
  // 組成新資料
  const seo = {
    // -------------------------------------------------------------------------------------
    // 網站名稱
    siteName: siteName,

    // 標題
    title: isShowSiteName ? `${title}｜${siteName}` : siteName,

    // 說明
    description: description || defaultDescription,

    // 封面圖片
    cover: cover
      ? `${siteUrl}${cover.childrenImageSharp[0].gatsbyImageData.images.fallback.src}`
      : defaultImage,

    // 該頁網址
    url: `${siteUrl}${pathname}`,

    // 該頁屬性種類
    type: type,

    // 發布日期
    publishedTime: publishedTime
      ? formatTimeZone(publishedTime, "Asia/Taipei", "yyyy-MM-dd HH:mm:ss")
      : "",

    // 更新日期
    modifiedTime: modifiedTime
      ? formatTimeZone(modifiedTime, "Asia/Taipei", "yyyy-MM-dd HH:mm:ss")
      : "",
    // -------------------------------------------------------------------------------------
  }

  // ------------------------------------------------------------------------------------------------------------------------------
  return (
    <Helmet
      title={seo.title}
      htmlAttributes={{
        lang: lang,
      }}
    >
      <meta charSet="utf-8" />
      <title>{seo.title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=5.0"
      />
      <meta http-equiv="content-language" content={lang} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.cover} />
      {/* Manifest */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      {/* Open Graph protocol */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      {seo.publishedTime && (
        <meta
          property={`${seo.type}:published_time`}
          content={seo.publishedTime}
        />
      )}
      {seo.modifiedTime && (
        <meta
          property={`${seo.type}:modified_time`}
          content={seo.modifiedTime}
        />
      )}
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:image" content={seo.cover} />
      <meta property="og:locale" content={lang} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;600&display=swap"
        rel="stylesheet"
      ></link>
    </Helmet>
  )
  // ------------------------------------------------------------------------------------------------------------------------------
}

export default SEO

const querySEO = graphql`
  query SEO {
    site {
      siteMetadata {
        siteName
        defaultDescription: description
        defaultImage: image
        siteUrl
        url
        fb_app_id
      }
    }
  }
`
