import { CreateNewUserDto } from "../../core/dtos/CreateNewUserDto";
import { UserProps } from "../../core/entities/User";
import UserRepository from "../../core/repositories/UserRepository";

export class UserInMemoryRepository implements UserRepository {
  users: UserProps[] = [];
  async findByEmail(email: string): Promise<UserProps | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

  async create(input: CreateNewUserDto): Promise<void> {
    this.users.push(input);
  }
}
