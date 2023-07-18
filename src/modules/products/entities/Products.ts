import { Column, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"; 

@Entity("Products")
export class Products {
    constructor(){
        if (!this.product_id){
            this.product_id = uuidV4();
        }
    }

    @PrimaryColumn()
    product_id: string;

    @Column()
    product_name: string;
    
    @Column()
    category: string;

    @Column()
    price: number;

    @Column()
    description: string
}
