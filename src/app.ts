import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import https from 'https';
import fs from 'fs';

// Routes
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/post.routes'
import CategoryRoutes from './routes/category.routes'

// 허용 url
const local_whitelist: string[] = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000"
];

// 허용 url
const whitelist: string[] = [
    "https://next-ts.ebosda.com/", 
    "https://next-ts.ebosda.com", 
    "http://next-ts.ebosda.com", 
    "next-ts.ebosda.com", 
    "https://next-ts.ebosda.com:8000", 
    "http://localhost:8000", 
    "http://127.0.0.1:8000"
]; 

// CORS 미들웨어를 추가하여 원하는 도메인에서만 요청 허용
const corsOptions = {
    origin: 'https://next-ts.ebosda.com', // 원하는 도메인 주소로 변경
    // origin: 'http://localhost:8000', // 원하는 도메인 주소로 변경
    optionsSuccessStatus: 200, // 성공 상태 코드
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 인증 정보를 요청에 포함할지 여부 (예: 쿠키)
};

const port: number | string = 443; // HTTPS 기본 포트

const ssl_options: https.ServerOptions = {
    ca: fs.readFileSync('/etc/letsencrypt/live/api.ebosda.com/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/api.ebosda.com/privkey.pem'),// 개인 키 파일 경로
    cert: fs.readFileSync('/etc/letsencrypt/live/api.ebosda.com/cert.pem')   // 인증서 파일 경로
};

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.app.use(express.static('public'));
        this.settings();
        this.middlewares();
        this.errorHandling(); // 예외처리 미들웨어 추가
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(cors(corsOptions)); // CORS 미들웨어를 라우팅 설정 전에 추가
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/posts', PostRoutes);
        this.app.use('/categories', CategoryRoutes);
    }

    private errorHandling() { 
        // 잘못된 도메인에서의 요청을 처리하는 미들웨어 추가
        this.app.use((req, res, next) => {
          let headers_origin: string | undefined = req.headers.origin as string;
          console.log(headers_origin);
          if (!headers_origin || !whitelist.includes(headers_origin)) {
            return res.redirect('https://blog.ebosda.com/');
          }
          next();
        });
    }

    // async listen(): Promise<void> {
    //     await this.app.listen(this.app.get('port'));
    //     console.log('Server on port', this.app.get('port'));
    // }

    async listen(): Promise<void> {
        const server = https.createServer({
          key: fs.readFileSync('/etc/letsencrypt/live/api.ebosda.com/privkey.pem'), // 개인 키 파일 경로
          cert: fs.readFileSync('/etc/letsencrypt/live/api.ebosda.com/cert.pem'), // 인증서 파일 경로
          ca: fs.readFileSync('/etc/letsencrypt/live/api.ebosda.com/fullchain.pem'), // CA 인증서 파일 경로
        }, this.app);
    
        server.listen(this.app.get('port'), () => {
          console.log('HTTPS Server is running on port', this.app.get('port'));
        });
    }
}

