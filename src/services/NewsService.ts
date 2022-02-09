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
    }

    public findById = async (id: number) => {
        const news = await this.repository

            .createQueryBuilder("news")
            .leftJoinAndSelect("news.topics", "topics")
            .where("news.id = :id", { id })
            .getOne();
        return news;
    }


    public indexByTopic = async (topicName: string) => {
        try {
            const news = await this.repository
                .createQueryBuilder("news")
                .leftJoinAndSelect("news.topics", "topics")
                .where("topics.name = :topicName", { topicName })
                .getMany();
            return news;
        } catch (error) {
            throw new Error('Topic not found')
        }
    }

    public indexByStatus = async (status) => {
        try {
            const news = await this.repository.find({
                where: {
                    status: status
                }
            })
            return news;
        } catch (err) {
            if (status != 'published' || status != 'draft' || status != 'deleted') {
                throw new Error("status name is invalid");
            }

        }
    }

    public create = async (news: News): Promise<News> => {
        let newsResult = await this.repository.create(news);
        return await this.repository.save(newsResult);
    }

    public update = async (id, news: News): Promise<News> => {
        const data = await this.repository.findOne(id);
        console.log('before', data);
        const updateResult = await this.repository.save({ ...data, ...news });
        console.log('result', updateResult);
        return updateResult;
    }

    public delete = async (id) => {
        return await this.repository.softDelete(id);
    }
}