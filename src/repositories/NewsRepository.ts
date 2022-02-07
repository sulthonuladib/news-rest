import { EntityRepository, Repository } from "typeorm";
import { News } from "../entity/News";
1
@EntityRepository(News)
export class NewsRepository extends Repository<News> {
}