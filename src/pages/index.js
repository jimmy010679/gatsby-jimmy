import React from "react"

import SEO from "../components/Common/SEO"
import Layout from "../components/Layout"

import { Container, Grid, Button, Paper } from "@material-ui/core"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.scss"

const Home = () => {
  return (
    <Layout>
      <SEO />
      <div className="blogNews">
        <Container maxWidth="lg">
          <h2>最新文章</h2>
          <Grid container spacing={3}>
            <Grid item xs={6} lg={7}>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </Grid>
            <Grid item xs={6} lg={5}>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </Grid>
            <Grid item xs={6} lg={4}>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </Grid>
            <Grid item xs={6} lg={4}>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </Grid>
            <Grid item xs={6} lg={4}>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="protfolio">
        <Container maxWidth="lg">
          <h2>作品集</h2>
          <Swiper
            spaceBetween={15}
            slidesPerView={3.3}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
            <SwiperSlide>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </SwiperSlide>
          </Swiper>
          <Button color="primary">Hello World</Button>
        </Container>
      </div>
    </Layout>
  )
}

export default Home
