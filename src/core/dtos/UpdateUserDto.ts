import { UserProps } from "../entities/User";

export interface UpdateUserDto
  extends Partial<Omit<UserProps, "password" | "id">> {
  _id: string;
}

export type UpdateUserOutputDto = {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
};
