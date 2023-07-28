import { Users } from "../entities/Users";


export interface IUsersRepository{
  create(user_name: string, password: string, email: string): Promise<Users>
  findByEmail(email: string): Promise<Users>;
  deleteByEmail(email: string): Promise<void>;
  update(
    user_id: string,
    user_name: string,
    password: string,
    email: string
  ): Promise<Users>;
  findById(user_id: string): Promise<Users>;
}