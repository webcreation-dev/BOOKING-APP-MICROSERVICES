import { MigrationInterface, QueryRunner } from "typeorm";

export class ReservationsMigrations1734920369030 implements MigrationInterface {
    name = 'ReservationsMigrations1734920369030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "reservation" (
                "id" SERIAL NOT NULL,
                "timestamp" TIMESTAMP NOT NULL,
                "startDate" TIMESTAMP NOT NULL,
                "endDate" TIMESTAMP NOT NULL,
                "userId" integer NOT NULL,
                "invoiceId" character varying NOT NULL,
                CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "reservation"
        `);
    }

}
