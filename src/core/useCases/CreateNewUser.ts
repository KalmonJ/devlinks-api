import { Hash } from "../adapters/Hash";
import { Identifier } from "../adapters/Identifier";
import { CreateNewUserDto } from "../dtos/CreateNewUserDto";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export class CreateNewUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashAdapter: Hash,
    private readonly identifierAdapter: Identifier
  ) {}

  async execute(input: Omit<CreateNewUserDto, "id">) {
    const user = new User({
      ...input,
      id: this.identifierAdapter.generate(),
      password: await this.hashAdapter.encrypt(input.password),
    });
    await this.userRepository.create(user.props);
  }
}
