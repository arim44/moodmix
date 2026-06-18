# 🍸 MoodMix

> 내 재료로 만드는 칵테일 추천 플랫폼

사용자가 보유한 재료를 선택하면 제조 가능한 칵테일을 추천받을 수 있는 서비스입니다.

칵테일 목록 및 상세 정보를 조회할 수 있으며, 관심 있는 칵테일을 즐겨찾기에 등록할 수 있습니다.
또한 직접 만든 칵테일 사진과 후기를 게시글로 작성하여 다른 사용자와 공유할 수 있는 Mix Board 기능을 제공합니다.

---

## 📌 프로젝트 소개

집에 있는 재료만으로 어떤 칵테일을 만들 수 있는지 쉽게 확인할 수 있도록 기획한 서비스입니다.

TheCocktailDB API를 활용하여 칵테일 데이터를 수집하고, 사용자가 선택한 재료를 기반으로 제조 가능한 칵테일을 추천합니다.

---

## 🚀 주요 기능

### 1. 재료 기반 칵테일 추천

* 보유한 재료 선택
* 제조 가능한 칵테일 추천
* 추천 결과 조회

### 2. 칵테일 정보 조회

* 전체 칵테일 목록 조회
* 칵테일 검색
* 칵테일 상세 정보 조회
* 제조 방법 및 재료 확인

### 3. 즐겨찾기

* 즐겨찾기 등록
* 즐겨찾기 목록 조회
* 즐겨찾기 삭제

### 4. Mix Board

* 게시글 등록
* 게시글 조회
* 게시글 수정
* 게시글 삭제
* 이미지 업로드 지원

---

## 🛠 Tech Stack

### Backend

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* Passport
* JWT Authentication
* Swagger

### Frontend

* React
* TypeScript

### Infra

* Azure App Service
* Azure PostgreSQL

### Open API

* TheCocktailDB API

---

## 🗄 Database

### 주요 테이블

* users
* cocktails
* ingredients
* cocktail_ingredients
* favorites
* posts

### 관계

* User ↔ Favorite (1:N)
* User ↔ Post (1:N)
* Cocktail ↔ Ingredient (N:M)
* Cocktail ↔ Favorite (1:N)

---

## 📡 API

### Auth

* POST /auth/signup
* POST /auth/login

### Cocktails

* GET /cocktails
* GET /cocktails/search
* GET /cocktails/:id

### Recommendation

* GET /ingredients
* POST /recommend

### Favorites

* POST /favorites
* GET /favorites/:userId
* DELETE /favorites/:id

### Posts

* POST /posts
* GET /posts
* GET /posts/:id
* PATCH /posts/:id
* DELETE /posts/:id

---

## 🔐 인증

Passport와 JWT 기반 인증을 사용합니다.

* 회원가입
* 로그인
* 인증 사용자 권한 확인
* 게시글 작성자 검증

---

## 👨‍💻 Developer

홍아림




- Nodejs 가이드
    
    ```markdown
    <p align="center">
      <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
    </p>
    
    [circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
    [circleci-url]: https://circleci.com/gh/nestjs/nest
    
      <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
        <p align="center">
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
    <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
    <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
    <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
    <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
      <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
        <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
      <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
    </p>
      <!--![Backers on Open Collective](https://opencollective.com/nest#backer)
      ![Sponsors on Open Collective](https://opencollective.com/nest#sponsor)-->
    
    ## Description
    
    Nest framework TypeScript starter repository.
    
    ## Project setup
    
    ```bash
    $ npm install
    ```
    
    ## Compile and run the project
    
    ```bash
    # development
    $ npm run start
    
    # watch mode
    $ npm run start:dev
    
    # production mode
    $ npm run start:prod
    ```
    
    ## Run tests
    
    ```bash
    # unit tests
    $ npm run test
    
    # e2e tests
    $ npm run test:e2e
    
    # test coverage
    $ npm run test:cov
    ```
    
    ## Deployment
    
    When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the deployment documentation for more information.
    
    If you are looking for a cloud-based platform to deploy your NestJS application, check out Mau, our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:
    
    ```bash
    $ npm install -g @nestjs/mau
    $ mau deploy
    ```
    
    With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
    
    ## Resources
    
    Check out a few resources that may come in handy when working with NestJS:
    
    - Visit the NestJS Documentation to learn more about the framework.
    - For questions and support, please visit our Discord channel.
    - To dive deeper and get more hands-on experience, check out our official video courses.
    - Deploy your application to AWS with the help of NestJS Mau in just a few clicks.
    - Visualize your application graph and interact with the NestJS application in real-time using NestJS Devtools.
    - Need help with your project (part-time to full-time)? Check out our official enterprise support.
    - To stay in the loop and get updates, follow us on X and LinkedIn.
    - Looking for a job, or have a job to offer? Check out our official Jobs board.
    
    ## Support
    
    Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please read more here.
    
    ## Stay in touch
    
    - Author - Kamil Myśliwiec
    - Website - https://nestjs.com
    - Twitter - @nestframework
    
    ## License
    
    Nest is MIT licensed.
    
    ```