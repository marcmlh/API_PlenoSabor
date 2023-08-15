import request from "supertest";
import { app } from "../../app";

export async function createProduct(
  product_name: string,
  category:
    | "Pizzas Salgadas"
    | "Pizzas Doces"
    | "Esfihas Salgadas"
    | "Esfihas Doces"
    | "Bebidas",
  price: number,
  description: string,
  token: string
) {
  const response = await request(app).post("/products").set("Authorization", `Bearer ${token}`).send({
    product_name,
    category,
    price,
    description,
  });

  return response.body.data;
}
