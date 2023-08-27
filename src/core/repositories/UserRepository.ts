import { CreateNewUserDto } from "../dtos/CreateNewUserDto";
import { UserProps } from "../entities/User";

export default interface UserRepository {
  create(input: CreateNewUserDto): Promise<void>;
  findByEmail(email: string): Promise<UserProps | null>;
}
