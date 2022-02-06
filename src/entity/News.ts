import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

export enum NewsStatus{
    DRAFT = "draft",
    PUBLISHED = "published",
    DELETED = "deleted"
}

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

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

    @DeleteDateColumn({
        type: "timestamp without time zone",
        default: () => "now()",
    })
    deleted_at: Date;
}
