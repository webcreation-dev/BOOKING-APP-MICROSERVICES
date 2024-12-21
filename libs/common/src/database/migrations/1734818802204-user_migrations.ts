import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigrations1734818802204 implements MigrationInterface {
    name = 'UserMigrations1734818802204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."role_enum" AS ENUM('ADMIN', 'MANAGER', 'USER')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."role_enum" NOT NULL DEFAULT 'ADMIN',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."role_enum"
        `);
    }

}
