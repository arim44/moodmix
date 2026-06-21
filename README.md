# 🍸 MoodMix Backend

> 내 재료로 만드는 칵테일 추천 플랫폼

TheCocktailDB Open API 데이터를 활용하여 칵테일 정보를 제공하고, 사용자가 선택한 재료를 기반으로 칵테일을 추천하는 서비스입니다.

JWT 인증을 적용하여 회원 기능을 구현하였으며, 게시판 및 이미지 업로드 기능을 제공합니다.

---

## 📌 프로젝트 소개

TheCocktailDB Open API 데이터를 활용하여 칵테일 정보를 제공하고, 사용자가 선택한 재료를 기반으로 칵테일을 추천하는 서비스입니다.

JWT 인증을 적용하여 회원 기능을 구현하였으며, 게시판 및 이미지 업로드 기능을 제공합니다.

---

## 🚀 주요 기능

### 회원

* 회원가입
* 로그인
* JWT 인증

### 칵테일

* 칵테일 목록 조회
* 칵테일 상세 조회
* 칵테일 이름 검색
* 재료 기반 추천

### 즐겨찾기

* 즐겨찾기 등록
* 내 즐겨찾기 조회
* 즐겨찾기 삭제

### 게시판

* 게시글 등록
* 게시글 조회
* 게시글 수정
* 게시글 삭제
* 이미지 업로드

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

### Authentication
* Passport
* JWT

### Documentation
* Swagger

### File Upload
* Multer
* Serve Static

### Frontend

* React
* TypeScript

### Infra -> 추후예정

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
* GET /cocktails/:id
* GET /cocktails/search

### Ingredients

* GET /ingredients

### Recommendation

* POST /cocktails/recommend

### Favorites

* POST /favorites
* GET /favorites
* DELETE /favorites/:id

### Posts

* POST /posts
* POST /posts/:id/images
* GET /posts
* GET /posts/:id
* PATCH /posts/:id
* DELETE /posts/:id

---

## 🔐 인증 및 권한

JWT 기반 인증을 적용하였습니다.

* 인증 사용자 확인
* 즐겨찾기 사용자 검증
* 게시글 작성자 검증
* 게시글 이미지 업로드 권한 검증

---

## 🔧 Trouble Shooting

### Open Cocktail DB 데이터 정규화

* 칵테일과 재료 데이터가 중복되는 구조
* Cocktail, Ingredient, CocktailIngredient 테이블로 분리하여 정규화

### 즐겨찾기 중복 등록 방지

* 동일 사용자가 같은 칵테일을 여러 번 등록 가능
* Prisma `@@unique([user_id, cocktail_id])` 적용

### React 로그인 요청 오류

* 입력 상태와 실제 요청 데이터가 달라 400 오류 발생
* Form 상태를 하나로 통합하여 해결

### 파일 업로드 검증

* 이미지 외 파일 업로드 가능
* Multer `fileFilter`를 이용하여 MIME 타입 검증 추가

### 게시글 권한 검증

* 타인의 게시글 수정 및 삭제 가능
* `validateOwner()` 로 작성자 검증 로직 공통화

---

## ⚙️ Environment Variables

```env
DATABASE_URL=
PORT=3000
JWT_SECRET=
APP_URL=http://localhost:3000
```

---

## ▶ 실행 방법

```bash
npm install

npx prisma migrate dev

npm run start:dev
```

---

## 📄 API 문서

Swagger

http://localhost:3000/api

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