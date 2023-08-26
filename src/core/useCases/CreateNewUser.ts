import { CreateNewUserDto } from "../dtos/CreateNewUserDto";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export class CreateNewUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateNewUserDto) {
    console.log(input, "input")
    const user =  new User(input)
    await this.userRepository.create(user.props)
  }
}
