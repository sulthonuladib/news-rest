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
        const newTopic = await this.repository.create(topic)
        return await this.repository.save(newTopic);
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