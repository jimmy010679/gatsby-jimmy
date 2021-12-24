import React from "react"
import { Link } from "gatsby"

import Container from "@mui/material/Container"

import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

import * as styles from "./footer.module.css"

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <Container maxWidth="lg">
        <div className={styles.main}>
          <div className={styles.info}>
            <h5>網站資訊</h5>
            <p>吉米的部落格！紀錄生活的點點滴滴~</p>
          </div>
          <div className={styles.tag}>
            <h5>標籤分類</h5>
            <ul>
              <li>
                <Link to="/blog/category/code/" title="程式開發">
                  程式開發
                </Link>
              </li>
              <li>
                <Link to="/blog/tag/開箱/" title="開箱">
                  開箱
                </Link>
              </li>
              <li>
                <Link to="/blog/category/3c/" title="3C家電">
                  3C家電
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.about}>
            <h5>相關連結</h5>
            <ul>
              <li>
                <a
                  href="https://www.104.com.tw/profile/UVHvZop4L"
                  target="_blank"
                  rel="noreferrer"
                  title="104個人品牌"
                  className={styles.e04}
                >
                  <img src="/images/104logo_branding.svg" alt="104個人品牌" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/jimmy010679"
                  target="_blank"
                  rel="noreferrer"
                  title="Github"
                >
                  <GitHubIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kyj-tw/"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          Copyright © 2018-2021 幻想吉米 - Powered by 幻想吉米
        </div>
      </Container>
    </footer>
  )
}

export default Footer
/*
const queryTags = graphql`
  query tagsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      limit: 10
      sort: { order: ASC, fields: frontmatter___id }
    ) {
      nodes {
        id
        frontmatter {
          tags
        }
      }
    }
  }
`*/
