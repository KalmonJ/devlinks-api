import { Either, Left, Right } from "../../utils/Either";
import { Hash } from "../adapters/Hash";
import { Identifier } from "../adapters/Identifier";
import { CreateNewUserDto } from "../dtos/CreateNewUserDto";
import { User, UserProps } from "../entities/User";
import { InvalidEmail } from "../exceptions/InvalidEmail";
import { InvalidPassword } from "../exceptions/InvalidPassword";
import UserRepository from "../repositories/UserRepository";

export class CreateNewUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashAdapter: Hash,
    private readonly identifierAdapter: Identifier
  ) {}

  async execute(
    input: CreateNewUserDto
  ): Promise<Either<InvalidEmail | InvalidPassword, UserProps>> {
    const user = User.create({
      ...input,
      id: this.identifierAdapter.generate(),
      password: await this.hashAdapter.encrypt(input.password),
    });
    if (user.isLeft()) {
      return Left.create(user.error);
    }
    const createdUser = await this.userRepository.create(user.value.props);
    return Right.create(createdUser);
  }
}
