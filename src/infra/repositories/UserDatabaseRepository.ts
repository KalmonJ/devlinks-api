import { UpdateUserDto } from "../../core/dtos/UpdateUserDto";
import { UserProps } from "../../core/entities/User";
import UserRepository from "../../core/repositories/UserRepository";
import UserSchema from "../db/mongodb/schemas/UserSchema";

export class UserDatabaseRepository implements UserRepository {
  async create(input: UserProps): Promise<UserProps> {
    const user = new UserSchema(input);
    const savedUser = await user.save();
    return savedUser as unknown as UserProps;
  }
  async findByEmail(email: string): Promise<UserProps | null> {
    const response = await UserSchema.findOne({ email });
    return response as unknown as UserProps;
  }
  async findById(id: string): Promise<UserProps | null> {
    return await UserSchema.findById(id).populate("links");
  }
  async update(input: UpdateUserDto): Promise<UserProps | null> {
    const response = await UserSchema.findOneAndUpdate(
      { _id: input._id },
      {
        $set: {
          lastName: input.lastName,
          image: input.image,
          firstName: input.firstName,
          email: input.email,
        },
      },
      {
        new: true,
      }
    );
    const updatedUser = await response?.save();

    return updatedUser as unknown as UserProps;
  }
}
