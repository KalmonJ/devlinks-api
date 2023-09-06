import { UserProps } from "../entities/User";

export interface AuthenticateUserDto {
  email: string;
  password: string;
}

export interface AuthenticateUserOutputDto {
  session: Session;
}

export type Session = {
  user: UserWithoutPassword;
  accessToken: string;
};

export type UserWithoutPassword = Omit<UserProps, "password">;
