import {MigrationInterface, QueryRunner} from "typeorm";

export class NewsTopic1644428180145 implements MigrationInterface {
    name = 'NewsTopic1644428180145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP DEFAULT 'now()', CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."news_status_enum" AS ENUM('draft', 'published', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "status" "public"."news_status_enum" NOT NULL DEFAULT 'draft', "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP DEFAULT 'now()', "deleted_at" TIMESTAMP DEFAULT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_topics" ("news_id" integer NOT NULL, "topic_id" integer NOT NULL, CONSTRAINT "PK_37d42252aef02b660abc4861b6d" PRIMARY KEY ("news_id", "topic_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b27e714e28122aef5065d8b7d9" ON "news_topics" ("news_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b018f6828a9584d8d443e77ce0" ON "news_topics" ("topic_id") `);
        await queryRunner.query(`ALTER TABLE "news_topics" ADD CONSTRAINT "FK_b27e714e28122aef5065d8b7d93" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "news_topics" ADD CONSTRAINT "FK_b018f6828a9584d8d443e77ce0f" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_topics" DROP CONSTRAINT "FK_b018f6828a9584d8d443e77ce0f"`);
        await queryRunner.query(`ALTER TABLE "news_topics" DROP CONSTRAINT "FK_b27e714e28122aef5065d8b7d93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b018f6828a9584d8d443e77ce0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b27e714e28122aef5065d8b7d9"`);
        await queryRunner.query(`DROP TABLE "news_topics"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TYPE "public"."news_status_enum"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
