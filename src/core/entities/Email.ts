import { Either, Left, Right } from "../../utils/Either";
import { InvalidEmail } from "../exceptions/InvalidEmail";

export class Email {
  email: string;
  private constructor(email: string) {
    this.email = email;
  }

  static validate(email: string): Either<InvalidEmail, string> {
    const emailRgx = /\w+@[a-z]+\.[a-z]{2,3}/gi;
    const matchEmail = emailRgx.test(email);
    if (!matchEmail) return Left.create(new InvalidEmail());
    return Right.create(email);
  }

  static create(email: string) {
    const validatedEmail = this.validate(email);
    if (validatedEmail.isLeft()) {
      return Left.create(validatedEmail.error);
    }
    return Right.create(validatedEmail.value);
  }
}
