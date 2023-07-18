import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Products1689015761498 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Products",
        columns: [
          {
            name: "product_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "product_name",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "price",
            type: "numeric",
          },
          {
            name: "description",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Products");
  }
}
