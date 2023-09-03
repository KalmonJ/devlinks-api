import { Either, Left, Right } from "../../utils/Either";
import { InvalidEmail } from "../exceptions/InvalidEmail";
import { InvalidPassword } from "../exceptions/InvalidPassword";

export interface UserProps {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  password: string;
}

export class User {
  props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  private static validateEmail(email: string) {
    const emailRgx = /\w+@[a-z]+\.[a-z]{2,3}/gi;
    const matchEmail = emailRgx.test(email);
    if (!matchEmail) return Left.create(new InvalidEmail());
    return Right.create(email);
  }

  private static validatePassword(password: string) {
    if (password.length < 8) {
      return Left.create(new InvalidPassword("Password too short"));
    }
    return Right.create(password);
  }

  // update(input: Partial<UserProps>) {
  //   Object.entries(input).forEach(([key, value]) => {
  //     if (key === "email") {
  //       this.validateEmail(value);
  //     } else if (key === "password") {
  //       this.validatePassword(value);
  //     }
  //     this.props[key as keyof UserProps] = value;
  //   });
  // }

  static create(
    props: UserProps
  ): Either<InvalidEmail | InvalidPassword, User> {
    const email: Either<InvalidEmail, string> = this.validateEmail(props.email);
    const password: Either<InvalidPassword, string> = this.validatePassword(
      props.password
    );

    console.log("aquiii");

    if (email.isLeft()) {
      return Left.create(email.error);
    }
    if (password.isLeft()) {
      return Left.create(password.error);
    }
    return Right.create(new User(props));
  }
}
