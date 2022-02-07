import { Router, Request, Response, NextFunction, ControllerMethod } from "express";

import { NewsService } from "../services/NewsService";

export class NewsController {
    public router: Router;
    public services: NewsService;

    constructor() {
        this.router = Router();
        this.services = new NewsService();
        this.routes();
    }

    public index: ControllerMethod = async (req, res) => {
        return res.send(await this.services.index());
    }

    public indexByTopic: ControllerMethod = async (req, res) => {
        return res.send(await this.services.indexByTopic(req.params.topic));
    }

    public indexByStatus: ControllerMethod = async (req, res) => {
        return res.send(await this.services.indexByStatus(req.params.statusName));
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.services.create(req.body);
            res.send({
                message: "News created",
                data: result,
            })
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(await this.services.update(req.params.id, req.body));
        } catch (error) {
            next(error)
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(await this.services.delete(req.params.id));
        } catch (error) {
            next(error);
        }
    }

    public routes() {
        this.router.get('/', this.index);
        this.router.get('/:topic', this.indexByTopic)
        this.router.get('/status/:statusName')
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}