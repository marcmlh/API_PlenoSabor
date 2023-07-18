import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("ItemsList")
export class ItemsList {
  constructor() {
    if (!this.itemList_id) {
      this.itemList_id = uuidV4();
    }
  }

  @PrimaryColumn()
  itemList_id: string;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  product_name: string;

  
  @Column()
  unit_price: number;
  
  @Column()
  quantity: number;
  
  @Column()
  details?: string;

  @Column()
  total: number;
}
