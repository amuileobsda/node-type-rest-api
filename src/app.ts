import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

// Routes
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/post.routes'
import CategoryRoutes from './routes/category.routes'

// 허용 url
const local_whitelist: string[] = ["http://localhost:3000", "http://localhost:8000","http://127.0.0.1:3000", "http://127.0.0.1:8000"];
// 허용 url
const whitelist: string[] = ["https://next-ts.ebosda.com", "http://next-ts.ebosda.com", "next-ts.ebosda.com"]; 

// CORS 미들웨어를 추가하여 원하는 도메인에서만 요청 허용
const corsOptions = {
    // origin: 'https://next-ts.ebosda.com', // 원하는 도메인 주소로 변경
    origin: 'http://localhost:3000', // 원하는 도메인 주소로 변경
    optionsSuccessStatus: 200, // 성공 상태 코드
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 인증 정보를 요청에 포함할지 여부 (예: 쿠키)
};

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        // this.errorHandling(); // 예외처리 미들웨어 추가
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
          if (!headers_origin || !whitelist.includes(headers_origin)) {
            return res.status(403).json({ message: '요청이 허용되지 않았습니다.' });
          }
          next();
        });
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}