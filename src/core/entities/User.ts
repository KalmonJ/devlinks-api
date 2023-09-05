import { Either, Left, Right } from "../../utils/Either";
import { InvalidEmail } from "../exceptions/InvalidEmail";
import { InvalidPassword } from "../exceptions/InvalidPassword";
import { Email } from "./Email";
import { Password } from "./Password";

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

  update(
    input: Partial<UserProps>
  ): Either<InvalidEmail | InvalidPassword, User> {
    if (input.email) {
      const validatedEmail = Email.validate(input.email);
      if (validatedEmail.isLeft()) return Left.create(validatedEmail.error);
    }

    if (input.password) {
      const validatedPassword = Password.validate(input.password);
      if (validatedPassword.isLeft())
        return Left.create(validatedPassword.error);
    }

    this.props = {
      ...this.props,
      ...input,
    };

    return Right.create(new User(this.props));
  }
  static create(
    props: UserProps
  ): Either<InvalidEmail | InvalidPassword, User> {
    const email = Email.validate(props.email);

    if (email.isLeft()) {
      return Left.create(email.error);
    }
    return Right.create(new User(props));
  }
}
