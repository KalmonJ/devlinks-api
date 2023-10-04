import { Either, Left, Right } from "../../utils/Either";
import { UpdateUserDto, UpdateUserOutputDto } from "../dtos/UpdateUserDto";
import { User, UserProps } from "../entities/User";
import { InvalidEmail } from "../exceptions/InvalidEmail";
import { UserNotFound } from "../exceptions/UserNotFound";
import UserRepository from "../repositories/UserRepository";

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: UpdateUserDto
  ): Promise<Either<UserNotFound | InvalidEmail, UpdateUserOutputDto>> {
    const dbUser = await this.userRepository.findById(input._id);

    if (!dbUser) return Left.create(new UserNotFound());
    const user = User.create(dbUser);

    if (user.isLeft()) {
      return Left.create(user.error);
    }

    const updatedUser = user.value.update(input);

    if (updatedUser.isLeft()) {
      return Left.create(updatedUser.error);
    }

    await this.userRepository.update(
      updatedUser.value.props as Required<UserProps>
    );

    return Right.create({
      _id: user.value.props._id as string,
      email: user.value.props.email,
      firstName: user.value.props.firstName,
      image: user.value.props.image,
      lastName: user.value.props.lastName,
    });
  }
}
