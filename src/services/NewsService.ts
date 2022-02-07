import { getConnection } from "typeorm"
import { News } from "../entity/News";
import { NewsRepository } from "../repositories/NewsRepository"

export class NewsService {
    private repository: NewsRepository

    constructor() {
        this.repository = getConnection().getCustomRepository(NewsRepository);
    }

    public index = async () => {
        const news = await this.repository
            .createQueryBuilder("news")
            .leftJoinAndSelect("news.topics", "topics")
            .getMany();
            return news;
        return news;
    }

    public indexByTopic = async (topicName: string) => {
        const news = await this.repository
            .createQueryBuilder("news")
            .leftJoinAndSelect("news.topics", "topics")
            .where("topics.name = :topicName", { topicName })
            .getMany();
        return news;
    }

    public indexByStatus = async (status: string) => {
        const news = await this.repository.find({
            where: {
                status: status
            }
        })
        return news;
    }

    public create = async (news: News): Promise<News> => {
        let newsResult = await this.repository.create(news);
        newsResult = { ...newsResult, topics: newsResult.topics }

        return await this.repository.save(newsResult);
    }

    public update = async (id, news: News) => {
        return await this.repository.update(id, news);
    }

    public delete = async (id) => {
        return await this.repository.softDelete(id);
    }
}