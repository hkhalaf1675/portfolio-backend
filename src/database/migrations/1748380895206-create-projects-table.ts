import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectsTable1748380895206 implements MigrationInterface {
    name = 'CreateProjectsTable1748380895206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`description\` text NULL, \`url\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects_skills_skills\` (\`projectsId\` int NOT NULL, \`skillsId\` int NOT NULL, INDEX \`IDX_d8128e9b444108a09d81529ea0\` (\`projectsId\`), INDEX \`IDX_5291aa5a2295552d375007fefe\` (\`skillsId\`), PRIMARY KEY (\`projectsId\`, \`skillsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`projects_skills_skills\` ADD CONSTRAINT \`FK_d8128e9b444108a09d81529ea06\` FOREIGN KEY (\`projectsId\`) REFERENCES \`Projects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`projects_skills_skills\` ADD CONSTRAINT \`FK_5291aa5a2295552d375007fefee\` FOREIGN KEY (\`skillsId\`) REFERENCES \`Skills\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects_skills_skills\` DROP FOREIGN KEY \`FK_5291aa5a2295552d375007fefee\``);
        await queryRunner.query(`ALTER TABLE \`projects_skills_skills\` DROP FOREIGN KEY \`FK_d8128e9b444108a09d81529ea06\``);
        await queryRunner.query(`DROP TABLE \`projects_skills_skills\``);
        await queryRunner.query(`DROP TABLE \`Projects\``);
    }

}
