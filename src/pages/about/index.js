import React from "react"

import Layout from "/src/components/layout"
import Seo from "/src/components/common/seo"
import Breadcrumb from "/src/components/common/bread/breadcrumb"

import Container from "@mui/material/Container"

import * as styles from "./index.module.css"

const About = ({ location }) => {
  // ------------------------------------------------------------------------------------------------

  return (
    <Layout path={location.pathname}>
      <Seo
        title="關於我"
        isShowSiteName={true}
        description="關於幻想吉米"
        BreadcrumbList={[
          {
            link: `/about/`,
            name: "關於我",
          },
        ]}
      />
      <div className={styles.about}>
        <Container maxWidth="lg">
          <div className={styles.content}>
            <Breadcrumb
              data={[
                {
                  title: "關於我",
                  link: "/about/",
                },
              ]}
            />
            <h1>關於我</h1>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default About
