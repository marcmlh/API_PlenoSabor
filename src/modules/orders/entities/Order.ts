import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("Orders")
export class Orders {
  constructor() {
    if (!this.order_id) {
      this.order_id = uuidV4();
    }
    if (!this.order_date) {
      this.order_date = new Date()
    }

    if (!this.payment_status) {
      this.payment_status = false
    }
  }

  @PrimaryColumn()
  order_id: string;

  @Column()
  user_id: string;

  @Column()
  order_date: Date;

  @Column()
  payment_status: boolean;
}
