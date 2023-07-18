import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ItemsLists1689602542630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ItemsList",
        columns: [
          {
            name: "itemList_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "order_id",
            type: "uuid",
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "product_name",
            type: "varchar",
          },
          {
            name: "unit_price",
            type: "numeric",
          },

          {
            name: "quantity",
            type: "numeric",
          },
          {
            name: "details",
            type: "varchar",
          },

          {
            name: "total",
            type: "numeric",
          },
        ],
        foreignKeys: [
          {
            name: "FKOrders",
            referencedTableName: "Orders",
            referencedColumnNames: ["order_id"],
            columnNames: ["order_id"],
            onDelete: "CASCADE",
          },
          {
            name: "FKProducts",
            referencedTableName: "Products",
            referencedColumnNames: ["product_id"],
            columnNames: ["product_id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ItemsLists");
  }
}
