import { CreateNewUserDto } from "../dtos/CreateNewUserDto";

export default interface UserRepository {
  create(input: CreateNewUserDto): Promise<void>;
}
