import { Users } from "../../modules/users/entities/Users";
import { InMemoryUsersRepository } from "../inMemoryRepositories/in-memory-users-repository";

export function createUserInMemory(
  user_name: string,
  password: string,
  email: string
): Promise<Users> {
  const usersRepository = new InMemoryUsersRepository();

  let user = usersRepository.create(user_name, password, email);

  return user;
}
