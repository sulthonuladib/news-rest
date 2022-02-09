import { Router, Request, Response, NextFunction, ControllerMethod } from "express";
import { stat } from "fs";
import { nextTick } from "process";

import { NewsService } from "../services/NewsService";

export class NewsController {
    public router: Router;
    public services: NewsService;

    constructor() {
        this.router = Router();
        this.services = new NewsService();
        this.routes();
    }

    public index = async (req, res) => {
        return res.send(await this.services.index());
    }

    public indexByTopic = async (req, res) => {
        try {
            const topicName = req.params.topic;
            const news = await this.services.indexByTopic(topicName);
            if (news.length > 0) {
                return res.send(news);
            } else {
                return res.status(404).send({ error: "Not found" });
            }

        } catch (error) {
            return res.send({ error: 'News with this topic is not found' });
        } 
    }

    public indexByStatus = async (req, res, next) => {
        // TODO: change to querystring
        try {
            const statusName = req.params.status
            if (statusName.length < 0) {
                return res.send({ error: "Status name is required" });
            }
            const news = await this.services.indexByStatus(statusName);
            if (news) {
                return res.send({ 'status': 'success', 'data': news });
            } else {
                return res.status(404).send({ 'status': 'error', 'message': 'Not found' });
            }
        } catch (error) {
            res.send({ 'status': 'error', 'message': error.message });
        }
    }

    public create = async (req, res, next) => {
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
            const result = await this.services.update(req.params.id, req.body);
            res.send({
                message: "News updated",
                data: result
            })
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
        this.router.get('/status/:status', this.indexByStatus)
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}