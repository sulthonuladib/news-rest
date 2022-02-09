import {Router, Request, Response, NextFunction} from "express";

import { NewsTopicServices } from "../services/NewsTopicServices";

export class NewsTopicController {
    public router: Router;
    public services: NewsTopicServices;

    constructor() {
        this.router = Router();
        this.services = new NewsTopicServices();
        this.routes();
    }

    public addTopicToNews = async (req, res, next) => {
        const {newsId, topicId} = req.body;
        try {
            const result = await this.services.addTopicToNews(newsId, topicId);
            res.send({
                message: "Topic added to news",
                data: result,
            })
        } catch (error) {
            next(error);
        }
    }

    public deleteTopicFromNews = async (req, res, next) => {
        const {newsId, topicId} = req.body;
        try {
            const result = await this.services.deleteTopicFromNews(newsId, topicId);
            res.send({
                message: "Topic deleted from news",
                data: result,
            })
        } catch (error) {
            next(error);
        }
    }

    public routes() {
        this.router.post('/', this.addTopicToNews);
        this.router.delete('/', this.deleteTopicFromNews);
    }
}