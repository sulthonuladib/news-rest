import {MigrationInterface, QueryRunner} from "typeorm";

export class NewsTopic1644221293186 implements MigrationInterface {
    name = 'NewsTopic1644221293186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "deleted_at" SET DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "deleted_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "updated_at" SET DEFAULT '2022-02-07 08:07:29.131279'`);
        await queryRunner.query(`ALTER TABLE "news" ALTER COLUMN "created_at" SET DEFAULT '2022-02-07 08:07:29.131279'`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "updated_at" SET DEFAULT '2022-02-07 08:07:29.131279'`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "created_at" SET DEFAULT '2022-02-07 08:07:29.131279'`);
    }

}
