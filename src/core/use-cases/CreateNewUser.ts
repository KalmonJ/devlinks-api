import { Either, Left, Right } from "../../utils/Either";
import { Hash } from "../adapters/Hash";
import { Identifier } from "../adapters/Identifier";
import { CreateNewUserDto } from "../dtos/CreateNewUserDto";
import { Password } from "../entities/Password";
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
    const password = await Password.create(input.password);

    if (password.isLeft()) {
      return Left.create(password.error);
    }

    const user = User.create({
      ...input,
      password: password.value.password,
    });

    if (user.isLeft()) {
      return Left.create(user.error);
    }
    const createdUser = await this.userRepository.create(user.value.props);
    return Right.create(createdUser);
  }
}
