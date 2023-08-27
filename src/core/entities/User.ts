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

  constructor(props: UserProps) {
    this.validateEmail(props.email);
    this.validatePassword(props.password);
    this.props = props;
  }

  private validateEmail(email: string) {
    const emailRgx = /\w+@[a-z]+\.[a-z]{2,3}/gi;
    const matchEmail = emailRgx.test(email);
    if (!matchEmail) throw new InvalidEmail();
  }

  private validatePassword(password: string) {
    if (password.length < 8) throw new InvalidPassword("Password too short");
  }

  update(input: Partial<UserProps>) {
    Object.entries(input).forEach(([key, value]) => {
      if (key === "email") {
        this.validateEmail(value);
      } else if (key === "password") {
        this.validatePassword(value);
      }
      this.props[key as keyof UserProps] = value;
    });
  }
}
