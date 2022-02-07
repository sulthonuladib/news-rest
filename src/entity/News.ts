import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, ManyToMany, JoinTable} from "typeorm";

import { Topic } from "./Topic";

export enum NewsStatus{
    DRAFT = "draft",
    PUBLISHED = "published",
    DELETED = "deleted"
}

interface INews {
    id: number;
    title: string;
    content: string;
    status: NewsStatus;
    topics: Topic[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({
        type: "enum",
        enum: NewsStatus,
        default: NewsStatus.DRAFT
    })
    status: NewsStatus;

    @ManyToMany(() => Topic, topic => topic.news)
    @JoinTable({
        name: "news_topics",
        joinColumn: {
            name: "news_id",
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: "topic_id",
            referencedColumnName: 'id'
        }
    })
    topics: Topic[];

    @CreateDateColumn({
        type: "timestamp without time zone",
        default: "now()"
    })
    created_at?: Date;

    @UpdateDateColumn({
        type: "timestamp without time zone",
        default: "now()",
        nullable: true
    })
    updated_at?: Date;

    @DeleteDateColumn({
        type: "timestamp without time zone",
        default: () => "NULL",
    })
    deleted_at?: Date;
}
