import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/Common/SEO"
import { PostCode } from "../components/Common/PostCode"

import { Container } from "@material-ui/core"

import "swiper/swiper.scss"

const Code = () => {
  const codeString = `
  header('Content-type: application/json');

  $jsonData = json_decode(file_get_contents('php://input'),true);

  $arrData = array(
    'status'=>'ok',
     'COPDBRTH'=> $jsonData['COPDBRTH']
  );
  `

  return (
    <Layout>
      <SEO />
      <div className="blogNews">
        <Container maxWidth="lg">
          <PostCode language="php" code={codeString} />
        </Container>
      </div>
    </Layout>
  )
}

export default Code
