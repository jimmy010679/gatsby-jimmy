# 幻想吉米

基於 Gatsby.js 進行建置的網站，其網站文章資料、分類設定與圖片檔案，需與 [gatsby-jimmy-data](https://github.com/jimmy010679/gatsby-jimmy-data) 進行搭配。

## 重要記事

- 2021/10/22: 升級至 Gatsby.js v4.0.0
- 2021/03/03: 升級至 Gatsby.js v3.0.0
- 2020/11/23: 開始遷移作業 Wordpress => Gatsby.js ^2.26.1

## Environment Variables

### 1. .env 檔案

##### .env.development (如本地有檔案設置 empty)

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

- `AWS_S3_BUCKET_MASTER`: Amazon S3 Master Bucket Name - master branch 有 commitc 會觸發 deploy
- `AWS_S3_BUCKET_PREVIEW`: Amazon S3 Preview Bucket Name - master branch 有 commit 會觸發 deploy
- `AWS_S3_BUCKET_DEVELOP`: Amazon S3 Develop Bucket Name - develop branch 有 commit 會觸發 deploy

#### AWS CloudFront

- `AWS_CLOUDFRONT_ID_DEVELOP`: Amazon CloudFront - develop branch
- `AWS_CLOUDFRONT_ID_MASTER`: Amazon CloudFront - master branch

#### AWS Elastic Beanstalk

- `AWS_ELASTICBEANSTALK_APPLICATION_NAME`: Amazon Elastic Beanstalk application-name (Preview)
- `AWS_ELASTICBEANSTALK_ENVIRONMENT_NAME`: Amazon Elastic Beanstalk environment-name (Preview)

## Server

- Production Server
  - branch: master
  - directions: 正式站點
  - hosting: AWS CloudFront + S3
  - domain: https://kyjhome.com
- Preview Server
  - branch: master
  - directions: 預覽編輯文章用
  - hosting: AWS Elastic Beanstalk
- Develop Server
  - branch: develop
  - directions: 測試新功能用
  - hosting: AWS CloudFront + S3

## Build and Develop tests

```sh
$ git clone git@github.com:jimmy010679/gatsby-jimmy.git
$ cd gatsby-jimmy
$ npm install
$ gatsby develop
$ gatsby build
```
