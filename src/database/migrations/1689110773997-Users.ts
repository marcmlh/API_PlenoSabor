import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1689110773997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Users",
        columns: [
          {
            name: "user_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Users");
  }
}
