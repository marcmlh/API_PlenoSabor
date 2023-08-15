import request from "supertest";
import { app } from "../../app";


export async function createAndAuthenticateUser(user_name : string,password : string,email : string){
      await request(app)
      .post("/users")
      .send({
        user_name,
        password,
        email,
      });

    const response = await request(app)
      .post("/users/authenticate")
      .send({ email, password });

      return response.body.data.token;
}