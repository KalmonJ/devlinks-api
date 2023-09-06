import { UpdateUserDto } from "../../core/dtos/UpdateUserDto";
import { UserProps } from "../../core/entities/User";
import UserRepository from "../../core/repositories/UserRepository";

export class UserInMemoryRepository implements UserRepository {
  users: UserProps[] = [];

  async findById(id: string): Promise<UserProps | null> {
    const user = this.users.find((user) => user._id === id);
    if (!user) return null;
    return user;
  }
  async update(input: UpdateUserDto): Promise<void> {
    const index = this.users.findIndex((user) => user._id === input.id);
    const user = { ...this.users[index], ...input };
    this.users[index] = user;
  }
  async findByEmail(email: string): Promise<UserProps | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    return user;
  }
  async create(input: UserProps): Promise<UserProps> {
    this.users.push(input);
    return input;
  }
}
