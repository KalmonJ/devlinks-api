import { UserProps } from "../entities/User";

export interface UpdateUserDto
  extends Partial<Omit<UserProps, "password" | "_id">> {
  _id: string;
}
