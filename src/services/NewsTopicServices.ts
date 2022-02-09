import { getConnection } from "typeorm";

import { TopicRepository } from "../repositories/TopicRepository";
import { NewsRepository } from "../repositories/NewsRepository";
import { Topic } from "../entity/Topic";
import { News } from "../entity/News";


export class NewsTopicServices {
    public topicRepository: TopicRepository;
    public newsRepository: NewsRepository;

    constructor() {
        this.newsRepository = getConnection().getCustomRepository(NewsRepository);
        this.topicRepository = getConnection().getCustomRepository(TopicRepository);
    }

    public addTopicToNews = async (newsId: number, topicId: number) => {
        const news = await this.newsRepository.createQueryBuilder("news")
            .leftJoinAndSelect("news.topics", "topics")
            .where("news.id = :id", { id: newsId }).getOne();
        const topic = await this.topicRepository.findOne(topicId);

        news.topics.push(topic);

        return await this.newsRepository.save(news);
    }

    public deleteTopicFromNews = async (newsId: number, topicId: number) => {
        const news = await this.newsRepository.createQueryBuilder("news")
            .leftJoinAndSelect("news.topics", "topics")
            .where("news.id = :id", { id: newsId }).getOne();
        const topic = await this.topicRepository.findOne(topicId);
        news.topics.splice(news.topics.indexOf(topic), 1);
        return await this.newsRepository.save(news);
    }
}
