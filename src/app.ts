import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

// Routes
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/post.routes'

// CORS 미들웨어를 추가하여 원하는 도메인에서만 요청 허용
const corsOptions = {
    origin: 'https://next-ts.ebosda.com', // 원하는 도메인 주소로 변경
    optionsSuccessStatus: 200, // 성공 상태 코드
};

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
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
    }

    private errorHandling() {
        // 잘못된 도메인에서의 요청을 처리하는 미들웨어 추가
        this.app.use((req, res, next) => {
            // console.log(req.headers.origin);
            // console.log(corsOptions.origin);
          if (!req.headers.origin || req.headers.origin !== corsOptions.origin) {
            return res.status(403).json({ message: 'Forbidden: 요청이 허용되지 않았습니다.' });
          }
          next();
        });
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}