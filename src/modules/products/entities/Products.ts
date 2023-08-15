import { Column, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"; 

@Entity("Products")
export class Products {
    constructor(){
        if (!this.product_id){
            this.product_id = uuidV4();
        }
    }

    @PrimaryColumn('text',{nullable:false})
    product_id: string;

    @Column('text',{nullable:false})
    product_name: string;
    
    @Column('text',{nullable:false})
    category: string;

    @Column('numeric',{nullable:false})
    price: number;

    @Column('text',{nullable:false})
    description: string
}
