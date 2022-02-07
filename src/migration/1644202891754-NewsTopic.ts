import {MigrationInterface, QueryRunner} from "typeorm";

export class NewsTopic1644202891754 implements MigrationInterface {
    name = 'NewsTopic1644202891754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP DEFAULT 'now()', CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."news_status_enum" AS ENUM('draft', 'published', 'deleted')`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "status" "public"."news_status_enum" NOT NULL DEFAULT 'draft', "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP DEFAULT 'now()', "deleted_at" TIMESTAMP DEFAULT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_topics_topic" ("newsId" integer NOT NULL, "topicId" integer NOT NULL, CONSTRAINT "PK_3f9bee3ed84f6e4daddbd537434" PRIMARY KEY ("newsId", "topicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e336b77d568c8936e8a55cb561" ON "news_topics_topic" ("newsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4673b71dc9a3dacf1235093947" ON "news_topics_topic" ("topicId") `);
        await queryRunner.query(`ALTER TABLE "news_topics_topic" ADD CONSTRAINT "FK_e336b77d568c8936e8a55cb561c" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "news_topics_topic" ADD CONSTRAINT "FK_4673b71dc9a3dacf1235093947b" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news_topics_topic" DROP CONSTRAINT "FK_4673b71dc9a3dacf1235093947b"`);
        await queryRunner.query(`ALTER TABLE "news_topics_topic" DROP CONSTRAINT "FK_e336b77d568c8936e8a55cb561c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4673b71dc9a3dacf1235093947"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e336b77d568c8936e8a55cb561"`);
        await queryRunner.query(`DROP TABLE "news_topics_topic"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TYPE "public"."news_status_enum"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
