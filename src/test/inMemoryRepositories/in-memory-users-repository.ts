import { Users } from "../../modules/users/entities/Users";
import { v4 as uuidV4 } from "uuid";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
    public items: Users[] = [];
  
    async create(
      user_name: string,
      password: string,
      email: string
    ): Promise<Users> {
      let user: Users = {
        user_id: uuidV4(),
        email,
        password,
        user_name,
      };
      
      this.items.push(user);
  
      return user;
    }
  
    async findByEmail(email: string): Promise<Users> {
      return this.items.find((user) => user.email === email);
    }
  
    async deleteByEmail(email: string): Promise<void> {
      const users = this.items.filter((user) => user.email !== email);
  
      this.items = users;
    }
  
    async update(
      user_id: string,
      user_name: string,
      password: string,
      email: string
    ): Promise<Users> {
      let users = this.items.map((user) => {
        if (user.user_id === user_id) {
          (user.user_name = user_name),
            (user.password = password),
            (user.email = email);
        }
  
        return user;
      });
  
      this.items = users;
  
      return { user_id, user_name, password, email };
    }
  
    async findById(user_id: string): Promise<Users> {
      return this.items.find((user) => user.user_id === user_id);
    }
  }