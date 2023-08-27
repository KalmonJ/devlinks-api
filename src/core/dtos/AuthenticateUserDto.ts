export interface AuthenticateUserDto {
  email: string;
  password: string;
}

export interface AuthenticateUserOutputDto {
  accessToken: string;
}
