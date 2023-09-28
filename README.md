### 프로젝트 실행
ts -> js로 빌드
```linux
npx tsc
```
or
```linux
npm run build
```

Node.js 애플리케이션 시작:
```linux
pm2 start dist/index.js
```


### PM2 프로세스 관리
```linux
애플리케이션 목록 표시: pm2 list
애플리케이션 상태 확인: pm2 show <app-name>
애플리케이션 재시작: pm2 restart <app-name>
애플리케이션 중지: pm2 stop <app-name>
애플리케이션 삭제: pm2 delete <app-name>
로그 확인: pm2 logs
<app-name>은 애플리케이션의 이름 또는 PM2 프로세스 ID일 수 있습니다.
```

부팅 시 PM2 자동 실행:
```typescript
pm2 startup
```

PM2 설정 파일 사용 (선택 사항):
PM2 설정을 더 자세하게 관리하려면 JSON 또는 JavaScript 형식의 PM2 설정 파일을 사용할 수 있습니다. 이 파일을 사용하여 애플리케이션 설정, 환경 변수 및 기타 설정을 관리할 수 있습니다.

예를 들어, ecosystem.config.js라는 PM2 설정 파일을 생성하고 애플리케이션 설정을 지정할 수 있습니다:
```cmd
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
이러한 설정 파일을 사용하면 pm2 start ecosystem.config.js와 같은 명령으로 애플리케이션을 시작할 수 있습니다.


### 설치과정

서버에 typescript 설치
```cmd
sudo npm i -g typescript
```

version check
```cmd
tsc --version
```

프로젝트 폴더 들어가서 설치
```cmd
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
```
or
```cmd
npm init -y

npm i express dotenv helmet cors http-status-codes uuid bcryptjs

npm i -D typescript

npm i -D @types/express @types/dotenv @types/helmet @types/cors @types/http-status-codes @types/uuid @types/bcryptjs
```


### 참고사이트

https://dev.to/realsteveig/nodejs-and-typescript-tutorial-build-a-rest-api-with-typescript-nodejs-and-a-file-based-storage-system-2l61

https://github.com/FaztWeb/typescript-mysql-rest

https://www.youtube.com/watch?v=4clEduk6OQM
