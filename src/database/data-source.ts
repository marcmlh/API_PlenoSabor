import { DataSource } from "typeorm"
import { Products1689015761498 } from "./migrations/1689015761498-Products"
import { Products } from "../modules/products/entities/Products"
import { Users } from "../modules/users/entities/Users"
import { Users1689110773997 } from "./migrations/1689110773997-Users"
import { Orders } from "../modules/orders/entities/Order"
import { Orders1689260987892 } from "./migrations/1689260987892-Orders"
import { ItemsList } from "../modules/itemsList/entities/ItemsList"
import { ItemsLists1689602542630 } from "./migrations/1689602542630-ItemsLists"


export const dataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: "docker",
    password: "plenosabor",
    database: "plenosabor",
    entities: [Products, Users, Orders, ItemsList],
    migrations: [Products1689015761498, Users1689110773997, Orders1689260987892, ItemsLists1689602542630]
})

export async function createConnection (database? : string,host = "localhost"){
    return await dataSource.setOptions({
        host : process.env.NODE_ENV === "localdevelopment" ? host : "database_plenosabor",
        database : database ?? "plenosabor"
    }).initialize().then(()=>{
        console.log("Database was initialized")
        return dataSource
    }).catch((error)=>{
        console.log(`Connection error : ${error}` )
        throw new Error(error)
    })
}
``