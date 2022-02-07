import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany} from "typeorm";

import { News } from "./News";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => News, news => news.topics)
    news: News[]

    @CreateDateColumn({
        type: "timestamp without time zone",
        default: "now()"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp without time zone",
        default: "now()",
        nullable: true
    })
    updated_at: Date;

}
