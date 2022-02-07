import { getConnection } from "typeorm"
import { News } from "../entity/News";
import { NewsRepository } from "../repositories/NewsRepository"

export class NewsService {
    private repository: NewsRepository

    constructor() {
        this.repository = getConnection().getCustomRepository(NewsRepository);
    }

    public index = async () => {
        const news = await this.repository.find();
        return news;
    } 

    public create = async (news: News): Promise<News> => {
        const newsResult = await this.repository.create()
        return newsResult;
    }

    public update = async (id, news: News) => {
        return await this.repository.update(id, news);
    }

    public delete = async (id) => {
        return await this.repository.softDelete(id);
    }
}