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
            <Grid item xs={6} lg={6}>
              <Paper elevation={2}>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
                <p>1</p>
              </Paper>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Grid container spacing={0} alignItems="stretch">
                <Grid item xs={6} lg={6}>
                  <Paper elevation={2}>1</Paper>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <Paper elevation={2}>2</Paper>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <Paper elevation={2}>3</Paper>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <Paper elevation={2}>4</Paper>
                </Grid>
              </Grid>
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
