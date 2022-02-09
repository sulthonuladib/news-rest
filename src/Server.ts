import  * as express from 'express';
import {Request, Response} from 'express';
import {createConnection} from 'typeorm';

import 'express-async-error'

import { NewsController } from './controllers/NewsController';
import { TopicController } from './controllers/TopicController';
import { NewsTopicController } from './controllers/NewsTopicController';

import { News } from './entity/News';
import { Topic } from './entity/Topic';

import ExceptionHandlers from './utils/ExceptionHandlers';

export class Server {
    private newsController: NewsController;
    private topicController: TopicController;
    private newsTopicController: NewsTopicController;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(ExceptionHandlers);
    }

    public async routes() {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: process.env.POSTGRES_USER || "news_api_db",
            password: process.env.POSTGRES_PASSWORD || "news_api_db",
            database: process.env.POSTGRES_DB || "news_api_db",
            entities: [
                // `/entity/*${'.ts' || '.js'}`,
                // `/src/entity/*${'.ts' || '.js'}`,
                // `entity/*${'.ts' || '.js'}`,
                // `src/entity/*${'.ts' || '.js'}`,
                Topic,
                News
            ],
            synchronize: true,
        }).then(connection => {
        });

        this.newsController = new NewsController();
        this.topicController = new TopicController();
        this.newsTopicController = new NewsTopicController();

        this.app.use('/api/news', this.newsController.router);
        this.app.use('/api/topics', this.topicController.router);
        this.app.use('/api/news-topic', this.newsTopicController.router);

        this.app.get('/api', (req: Request, res: Response) =>  {
            // res.send("news rest api")
        });

    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is running at http://localhost:${this.app.get('port')}`);
        })
    }
}
