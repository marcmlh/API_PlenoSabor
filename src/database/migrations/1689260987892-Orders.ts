import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Orders1689260987892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
              name: "Orders",
              columns: [
                {
                  name: "order_id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "user_id",
                  type: "uuid",
                },
                {
                  name: "order_date",
                  type: "date",
                },
                {
                  name: "payment_status",
                  type: "boolean",
                  default: false
                },
              ],
              foreignKeys: [
                {
                  name: "FKUser",
                  referencedTableName: "Users",
                  referencedColumnNames: ["user_id"],
                  columnNames: ["user_id"],
                  onDelete: "CASCADE",
                  onUpdate: "CASCADE"
                },
              ],
            })
          );
        }
      
        public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable("Orders")
        }
      }
      