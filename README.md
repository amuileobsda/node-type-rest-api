# node.js와 typescript를 이용한 rest api 개발

- [프로젝트 실행방법](#프로젝트-실행방법)
- [typescript를 javascript로 빌드](#typescript를-javascript로-빌드)
- [Nodejs 애플리케이션 시작](#Nodejs-애플리케이션-시작)
- [PM2 프로세스 관리](#PM2-프로세스-관리)
- [PM2 설정 파일 사용](#PM2-설정-파일-사용)
- [설치과정](#설치과정)
- [서버에 typescript 설치](#서버에-typescript-설치)
- [version check](#version-check)
- [프로젝트 폴더 들어가서 설치](#프로젝트-폴더-들어가서-설치)
- [참고사이트](#참고사이트)


## 프로젝트 실행방법
### typescript를 javascript로 빌드
타입스크립트를 자바스크립트로 dist 폴더 하위 경로에 빌드후 해당 폴더의 index.js 파일을 node dist/index.js로 실행시켜준다.
```shell
npx tsc
```
or
```shell
npm run build
```

### Nodejs 애플리케이션 시작
```shell
node dist/index.js
```
or
```shell
pm2 start dist/index.js
```

### PM2 프로세스 관리
```shell
//애플리케이션 목록 표시
pm2 list

//애플리케이션 상태 확인
pm2 show <app-name>

//애플리케이션 재시작
pm2 restart <app-name>

//애플리케이션 중지
pm2 stop <app-name>

//애플리케이션 삭제
pm2 delete <app-name>

//로그 확인
pm2 logs

//부팅 시 PM2 자동 실행
pm2 startup

//<app-name>은 애플리케이션의 이름 또는 PM2 프로세스 ID일 수 있습니다.
```

### PM2 설정 파일 사용
PM2 설정을 더 자세하게 관리하려면 JSON 또는 JavaScript 형식의 PM2 설정 파일을 사용할 수 있습니다. 이 파일을 사용하여 애플리케이션 설정, 환경 변수 및 기타 설정을 관리할 수 있습니다.

예를 들어, `ecosystem.config.js` 라는 PM2 설정 파일을 생성하고 애플리케이션 설정을 지정할 수 있습니다

```shell
module.exports = {
  apps: [
    {
      name: 'my-app',
      script: 'app.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

이러한 설정 파일을 사용하면 `pm2 start ecosystem.config.js` 와 같은 명령으로 애플리케이션을 시작할 수 있습니다.



## 설치과정
### 서버에 typescript 설치
```shell
sudo npm i -g typescript
```

### version check
```shell
tsc --version
```

### 프로젝트 폴더 들어가서 필요한 모듈설치
```shell
npm init -y

npm i typescript -D

npx typescript --init

npm i express

npx tsc

npm install nodemon -D

npm i ts-node -D

npm i morgan

npm i @types/morgan -D

npm i mysql2

npm i types/mysql2 -D

npm i express cors

npm i --save-dev @types/cors

npm install express http-proxy http

npm i --save-dev @types/http-proxy

```
or
```shell
npm init -y

npm i express dotenv helmet cors http-status-codes uuid bcryptjs

npm i -D typescript

npm i -D @types/express @types/dotenv @types/helmet @types/cors @types/http-status-codes @types/uuid @types/bcryptjs

```


## 참고사이트
```
- https://dev.to/realsteveig/nodejs-and-typescript-tutorial-build-a-rest-api-with-typescript-nodejs-and-a-file-based-storage-system-2l61
- https://github.com/FaztWeb/typescript-mysql-rest
- https://www.youtube.com/watch?v=4clEduk6OQM
```
