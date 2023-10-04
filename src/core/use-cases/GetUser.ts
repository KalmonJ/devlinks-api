import { Either, Left, Right } from "../../utils/Either";
import { UserProps } from "../entities/User";
import { UserNotFound } from "../exceptions/UserNotFound";
import UserRepository from "../repositories/UserRepository";

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const response = await this.userRepository.findById(userId);
    if (!response) {
      return Left.create(new UserNotFound());
    }
    return Right.create(response);
  }
}
