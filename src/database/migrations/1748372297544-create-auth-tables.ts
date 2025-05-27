import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthTables1748372297544 implements MigrationInterface {
    name = 'CreateAuthTables1748372297544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`category\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_09150396628cb1f7284c5b85d9\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_permissions_permissions\` (\`usersId\` int NOT NULL, \`permissionsId\` int NOT NULL, INDEX \`IDX_b70d6dbde0e342b2afd199490c\` (\`usersId\`), INDEX \`IDX_f417b3a2e38339487716aa0742\` (\`permissionsId\`), PRIMARY KEY (\`usersId\`, \`permissionsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_permissions_permissions\` ADD CONSTRAINT \`FK_b70d6dbde0e342b2afd199490cc\` FOREIGN KEY (\`usersId\`) REFERENCES \`Users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions_permissions\` ADD CONSTRAINT \`FK_f417b3a2e38339487716aa0742a\` FOREIGN KEY (\`permissionsId\`) REFERENCES \`Permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_permissions_permissions\` DROP FOREIGN KEY \`FK_f417b3a2e38339487716aa0742a\``);
        await queryRunner.query(`ALTER TABLE \`users_permissions_permissions\` DROP FOREIGN KEY \`FK_b70d6dbde0e342b2afd199490cc\``);
        await queryRunner.query(`DROP INDEX \`IDX_f417b3a2e38339487716aa0742\` ON \`users_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_b70d6dbde0e342b2afd199490c\` ON \`users_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`users_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c3ab3f49a87e6ddb607f3c494\` ON \`Users\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP INDEX \`IDX_09150396628cb1f7284c5b85d9\` ON \`Permissions\``);
        await queryRunner.query(`DROP TABLE \`Permissions\``);
    }

}
