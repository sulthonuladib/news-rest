import { Router, Request, Response, NextFunction } from "express";

import { TopicService } from "../services/TopicService";

export class TopicController {
    public router: Router;
    public services: TopicService;

    constructor() {
        this.router = Router();
        this.services = new TopicService();
        this.routes()
    }

    public index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send(await this.services.index())
        } catch (error) {
            next(error)
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.services.create(req.body);
            res.status(200).send({
                message: "success",
                data: result,
            })
        } catch (error) {
            res.status(500).send({
                message: "failed",
                data: error
            })
            
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
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
    
}