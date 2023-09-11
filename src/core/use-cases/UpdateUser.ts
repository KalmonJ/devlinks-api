import { Either, Left, Right } from "../../utils/Either";
import { UpdateUserDto } from "../dtos/UpdateUserDto";
import { User, UserProps } from "../entities/User";
import { UserNotFound } from "../exceptions/UserNotFound";
import UserRepository from "../repositories/UserRepository";

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUserDto): Promise<Either<UserNotFound, string>> {
    const dbUser = await this.userRepository.findById(input._id);

    if (!dbUser) return Left.create(new UserNotFound());
    const user = User.create(dbUser);
    if (user.isLeft()) {
      return Left.create(user.error);
    }
    await this.userRepository.update(user.value.props as Required<UserProps>);
    return Right.create("User successfully updated");
  }
}
