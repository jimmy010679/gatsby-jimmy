import React from "react"

import SEO from "../components/Common/SEO"
import Layout from "../components/Layout"

import SyntaxHighlighter from "react-syntax-highlighter"
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

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


  function curl_post($url,$post) {

  	$payload = json_encode($post);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST,true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST,'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    $result = curl_exec($ch);
    curl_close ($ch);
    return $result;
  }

  $postWEB = curl_post('http://10.1.1.10:8000/api/test', $jsonData);
  #$postWEB = curl_post('http://10.1.1.10:8000/api/test', $arrData);
  echo $postWEB;
  `

  return (
    <Layout>
      <SEO />
      <div className="blogNews">
        <Container maxWidth="lg">
          <SyntaxHighlighter language="php" style={a11yDark}>
            {codeString}
          </SyntaxHighlighter>
        </Container>
      </div>
    </Layout>
  )
}

export default Code
