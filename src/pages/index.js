import React from "react"

import SEO from "../components/Common/SEO"
import Layout from "../components/Layout"

import { Container, Grid, Button } from "@material-ui/core"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/swiper.scss"

const Home = () => {
  return (
    <Layout>
      <SEO />

      <div className="banner">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          ...
        </Swiper>
      </div>
      <Container maxWidth="lg">
        <Button color="primary">Hello World</Button>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            xs=12
          </Grid>
          <Grid item xs={6}>
            xs=6
          </Grid>
          <Grid item xs={6}>
            xs=6
          </Grid>
          <Grid item xs={3}>
            xs=3
          </Grid>
          <Grid item xs={3}>
            xs=3
          </Grid>
          <Grid item xs={3}>
            xs=3
          </Grid>
          <Grid item xs={3}>
            xs=3
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
