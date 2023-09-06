import { UpdateUserDto } from "../../core/dtos/UpdateUserDto";
import { UserProps } from "../../core/entities/User";
import UserRepository from "../../core/repositories/UserRepository";
import UserSchema from "../db/mongodb/schemas/UserSchema";

export class UserDatabaseRepository implements UserRepository {
  async create(input: UserProps): Promise<UserProps> {
    const user = new UserSchema(input);
    const savedUser = await user.save();
    return savedUser;
  }
  async findByEmail(email: string): Promise<UserProps | null> {
    return await UserSchema.findOne({ email });
  }
  async findById(id: string): Promise<UserProps | null> {
    return await UserSchema.findById(id);
  }
  async update(input: UpdateUserDto): Promise<void> {
    await UserSchema.findOneAndUpdate({ _id: input._id }, { $set: input });
  }
}
