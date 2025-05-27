import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExperiencesTable1748379545769 implements MigrationInterface {
    name = 'CreateExperiencesTable1748379545769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Experiences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`jobTitle\` varchar(255) NULL, \`companyName\` varchar(255) NULL, \`description\` text NULL, \`startDate\` date NULL, \`endDate\` date NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Experiences\``);
    }

}
