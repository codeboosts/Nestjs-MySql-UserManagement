import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1712730773510 implements MigrationInterface {
  name = 'User1712730773510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`ID\` varchar(36) NOT NULL, \`createdAt\` bigint NOT NULL, \`updatedAt\` bigint NULL, \`deletedAt\` bigint NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`emailVerified\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
