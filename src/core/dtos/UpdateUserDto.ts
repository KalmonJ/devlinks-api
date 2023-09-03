import { UserProps } from "../entities/User";

export interface UpdateUserDto
  extends Partial<Omit<UserProps, "password" | "id">> {
  id: string;
}
