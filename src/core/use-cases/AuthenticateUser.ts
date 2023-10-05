import { Either, Left, Right } from "../../utils/Either";
import { Hash } from "../adapters/Hash";
import { Jwt } from "../adapters/Jwt";
import {
  AuthenticateUserDto,
  AuthenticateUserOutputDto,
} from "../dtos/AuthenticateUserDto";
import { InvalidCredentials } from "../exceptions/InvalidCredentials";
import { UserNotFound } from "../exceptions/UserNotFound";
import UserRepository from "../repositories/UserRepository";

export class AuthenticateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashAdapter: Hash,
    private readonly jwtAdapter: Jwt
  ) {}

  async execute(
    input: AuthenticateUserDto
  ): Promise<
    Either<UserNotFound | InvalidCredentials, AuthenticateUserOutputDto>
  > {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) return Left.create(new UserNotFound());
    const match = await this.hashAdapter.compare(input.password, user.password);
    if (!match) return Left.create(new InvalidCredentials());
    const token = this.jwtAdapter.sign({ userId: user._id });

    return Right.create({
      session: {
        accessToken: token,
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          image: user.image,
          lastName: user.lastName,
        },
      },
    });
  }
}
