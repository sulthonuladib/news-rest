import { getConnection } from "typeorm";
import { Topic } from "../entity/Topic";
import { TopicRepository } from "../repositories/TopicRepository";

export class TopicService {
    private repository: TopicRepository;

    constructor() {
        this.repository = getConnection().getCustomRepository(TopicRepository);
    }

    public index = async () => {
        const topics = await this.repository.find();
        return topics;
    }

    public create = async (topic: Topic) => {
        const result = await this.repository.create(topic);
        const topicResult = await this.repository.save(result)
        return topicResult;
    }

    public update = async (id, topic: Topic) => {
        const updateResult = await this.repository.update(id, topic);
        return updateResult;
    }

    public delete = async (id) => {
        const deleteResult = await this.repository.delete(id);
        return deleteResult;
    }
}