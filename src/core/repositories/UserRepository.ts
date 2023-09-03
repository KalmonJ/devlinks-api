import { UpdateUserDto } from "../dtos/UpdateUserDto";
import { UserProps } from "../entities/User";

export default interface UserRepository {
  create(input: UserProps): Promise<UserProps>;
  findByEmail(email: string): Promise<UserProps | null>;
  findById(id: string): Promise<UserProps | null>;
  update(input: UpdateUserDto): Promise<void>;
}
