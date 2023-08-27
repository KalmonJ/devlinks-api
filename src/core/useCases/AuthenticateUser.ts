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
  ): Promise<AuthenticateUserOutputDto> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) throw new UserNotFound();

    const match = this.hashAdapter.compare(input.password, user.password);
    if (!match) throw new InvalidCredentials();

    const token = this.jwtAdapter.sign(user.id);
    return {
      accessToken: token,
    };
  }
}
