import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

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
