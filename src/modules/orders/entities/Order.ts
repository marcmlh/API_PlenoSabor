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

  @PrimaryColumn('text',{nullable:false})
  order_id: string;

  @Column('text',{nullable:false})
  user_id: string;

  @Column('date',{nullable:false})
  order_date: Date;

  @Column('bool',{nullable:false})
  payment_status: boolean;
}
