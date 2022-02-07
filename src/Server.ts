import  * as express from 'express';
import {Request, Response} from 'express';
import { connect } from 'net';
import {createConnection} from 'typeorm';

import { NewsController } from './controllers/NewsController';
import { TopicController } from './controllers/TopicController';

export class Server {
    private newsController: NewsController;
    private topicController: TopicController;
    private app: express.Application;

    constructor() {
        this.app = express();
        this.configuration();

        this.newsController = new NewsController();
        this.topicController = new TopicController();

        this.routes();
    }

    public configuration() {
        this.app.set('port', process.env.PORT || 3000);
    }

    public async routes() {
        await createConnection({
            type: "postgres",
            host: "postgres_dev",
            port: 5432,
            username: process.env.POSTGRES_USER || "news_api_db",
            password: process.env.POSTGRES_PASSWORD || "news_api_db",
            database: process.env.POSTGRES_DB || "news_api_db",
            entities: [
                "/entity/*.ts",
                "/src/entity/*.ts",
                "entity/*.ts",
                "src/entity/*.ts",
            ],
            synchronize: true,
            name: "news_api"
        }).then(connection => {

            this.app.use('/api/news', this.newsController.router);
            this.app.use('/api/topics', this.topicController.router);

            this.app.get('/api', (req: Request, res: Response) =>  {
                res.send("news rest api")
            });
        });


    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is running at http://localhost:${this.app.get('port')}`);
        })
    }
}