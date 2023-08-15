import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("Users")
export class Users {
  constructor() {
    if (!this.user_id) {
      this.user_id = uuidV4();
    }
  }

  @PrimaryColumn('text',{nullable:false})
  user_id: string;

  @Column('text',{nullable:false})
  user_name: string;

  @Column('text',{nullable:false})
  password: string;

  @Column('text',{nullable:false})
  email: string;
}
