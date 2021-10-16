const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1634199770387 {
    name = 'initialSchema1634199770387'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "report_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "longtitude" integer NOT NULL, "latitude" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_report_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "longtitude" integer NOT NULL, "latitude" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_8f2828e57b5484726488f72ad58" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_report_entity"("id", "price", "make", "model", "year", "longtitude", "latitude", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "longtitude", "latitude", "mileage", "approved", "userId" FROM "report_entity"`);
        await queryRunner.query(`DROP TABLE "report_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_report_entity" RENAME TO "report_entity"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report_entity" RENAME TO "temporary_report_entity"`);
        await queryRunner.query(`CREATE TABLE "report_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "longtitude" integer NOT NULL, "latitude" integer NOT NULL, "mileage" integer NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "report_entity"("id", "price", "make", "model", "year", "longtitude", "latitude", "mileage", "approved", "userId") SELECT "id", "price", "make", "model", "year", "longtitude", "latitude", "mileage", "approved", "userId" FROM "temporary_report_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_report_entity"`);
        await queryRunner.query(`DROP TABLE "report_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }
}
