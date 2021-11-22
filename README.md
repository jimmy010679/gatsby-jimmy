<h1 align="center">幻想吉米</h1>

基於 Gatsby.js 進行建置的[個人部落格](https://kyjhome.com)，其網站文章資料、分類設定與圖片檔案，需與另一個 [repositories](https://github.com/jimmy010679/gatsby-jimmy-data) 進行搭配。

## 重要記事

- 2021/10/22: 升級至 Gatsby.js v4.0.0
- 2021/03/03: 升級至 Gatsby.js v3.0.0
- 2020/11/23: 開始遷移作業 Wordpress => Gatsby.js ^2.26.1

## Environment Variables

### 1. .env 檔案

如本地有檔案請將 `DATA_SOURCE_BRANCH` 設成 `empty`

##### .env.development

```
DATA_SOURCE_BRANCH=empty
```

##### .env.production

```
DATA_SOURCE_BRANCH=master
```

### 2. 遠程 Git repositories

根據.env `DATA_SOURCE_BRANCH` 的值，與根目錄下的 `gatsby-config.js` 進行配置。

```javascript
module.exports = {
  plugins: [
    /* 遠程 Git repositories 資料 */
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `gatsby-jimmy-data`,
        remote: `https://github.com/jimmy010679/gatsby-jimmy-data.git`,
        branch: process.env.DATA_SOURCE_BRANCH,
      },
    },
  ],
}
```

## GitHub Settings Secrets 配置

GitHub Action `.github/workflows/node.js.yml` 會使用到。

#### AWS 基本連線資訊

- `AWS_ACCESS_KEY_ID`: aws-access-key-id
- `AWS_SECRET_ACCESS_KEY`: aws-secret-access-key
- `AWS_REGION`: aws-region

#### AWS S3

- `AWS_S3_BUCKET_MASTER`: Amazon S3 Master Bucket Name
- `AWS_S3_BUCKET_PREVIEW`: Amazon S3 Preview Bucket Name
- `AWS_S3_BUCKET_DEVELOP`: Amazon S3 Develop Bucket Name

#### AWS CloudFront

- `AWS_CLOUDFRONT_ID_MASTER`: Amazon CloudFront - master branch
- `AWS_CLOUDFRONT_ID_DEVELOP`: Amazon CloudFront - develop branch

#### AWS Elastic Beanstalk

- `AWS_ELASTICBEANSTALK_APPLICATION_NAME`: Amazon Elastic Beanstalk application-name (Preview Server)
- `AWS_ELASTICBEANSTALK_ENVIRONMENT_NAME`: Amazon Elastic Beanstalk environment-name (Preview Server)

## GitHub Action

#### master branch

1. 讀取上次 cache 目錄 (`public`, `.cache`)
2. 執行 `$ npm install`
3. 執行 `$ gatsby build`
4. 將產生的 /public 資料夾上傳到 Amazon S3 (`AWS_S3_BUCKET_MASTER`)
5. Amazon CloudFront 清除緩存 (`AWS_CLOUDFRONT_ID_MASTER`)
6. 將必要的原始 code 檔案壓縮成 zip 檔
7. 將 zip 檔上傳傳到 Amazon S3 (`AWS_S3_BUCKET_PREVIEW`)
8. ElasticBeanstalk 新增一筆應用程式版本
9. ElasticBeanstalk 將該環境切換到最新

#### develop branch

1. 讀取上次 cache 目錄 (`public`, `.cache`)
2. 執行 `$ npm install`
3. 執行 `$ gatsby build`
4. 將產生的 /public 資料夾上傳到 Amazon S3 (`AWS_S3_BUCKET_DEVELOP`)
5. Amazon CloudFront 清除緩存 (`AWS_CLOUDFRONT_ID_DEVELOP`)

## Server

- **Production Server**
  - directions: 正式站點
  - branch: master
  - run: `gatsby build`
  - hosting: Amazon CloudFront + S3
  - domain: https://kyjhome.com
- **Preview Server**
  - directions: 預覽編輯文章用
  - branch: master
  - run: `ENABLE_GATSBY_REFRESH_ENDPOINT=true gatsby develop -p 8080`
  - hosting: Amazon Elastic Beanstalk
- **Develop Server**
  - directions: 測試新功能用
  - branch: develop
  - run: `gatsby build`
  - hosting: Amazon CloudFront + S3

## Build and Develop tests

```sh
$ git clone git@github.com:jimmy010679/gatsby-jimmy.git
$ cd gatsby-jimmy
$ npm install
$ gatsby develop 或 $ gatsby build
```
