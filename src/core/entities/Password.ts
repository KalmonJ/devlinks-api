import { HashAdapter } from "../../infra/adapters/HashAdapter";
import { Either, Left, Right } from "../../utils/Either";
import { InvalidPassword } from "../exceptions/InvalidPassword";

export class Password {
  readonly password: string;
  private constructor(password: string) {
    this.password = password;
  }

  private static async validateAndEncryptPassword(
    password: string
  ): Promise<Either<InvalidPassword, string>> {
    const validatedPassword = this.validate(password);
    if (validatedPassword.isLeft()) {
      return Left.create(validatedPassword.error);
    }
    const encryptedPassword = await this.hashPassword(validatedPassword.value);
    return Right.create(encryptedPassword);
  }

  static validate(password: string) {
    if (password.length < 8)
      return Left.create(new InvalidPassword("Password is too short"));
    return Right.create(password);
  }

  private static async hashPassword(password: string): Promise<string> {
    const hash = new HashAdapter();
    const encryptedPassword = await hash.encrypt(password);
    return encryptedPassword;
  }

  static async create(
    password: string
  ): Promise<Either<InvalidPassword, Password>> {
    const validatedPassword = await this.validateAndEncryptPassword(password);
    if (validatedPassword.isLeft()) {
      return Left.create(validatedPassword.error);
    }
    return Right.create(new Password(validatedPassword.value));
  }
}
