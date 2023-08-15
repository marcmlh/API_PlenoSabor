import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("ItemsList")
export class ItemsList {
  constructor() {
    if (!this.itemList_id) {
      this.itemList_id = uuidV4();
    }
  }

  @PrimaryColumn('text',{nullable:false})
  itemList_id: string;

  @Column('text',{nullable:false})
  order_id: string;

  @Column('text',{nullable:false})
  product_id: string;

  @Column('text',{nullable:false})
  product_name: string;

  
  @Column('numeric',{nullable:false})
  unit_price: number;
  
  @Column('numeric',{nullable:false})
  quantity: number;
  
  @Column('text',{nullable:true})
  details?: string;

  @Column('numeric',{nullable:false})
  total: number;
}
