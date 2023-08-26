import { InvalidEmail } from "../exceptions/InvalidEmail";
import { InvalidPassword } from "../exceptions/InvalidPassword";

export interface UserProps {
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  password: string;
}

export class User {
  props: UserProps;

  constructor(props: UserProps) {

    this.validateEmail(props.email)
    this.validatePassword(props.password)
    this.props = props;
  }


  private validateEmail(email:string){
    const emailRgx = /\w+@[a-z]+\.[a-z]{2,3}/g
    const matchEmail = emailRgx.test(email)
    if(!matchEmail) throw new InvalidEmail()
  }

  private validatePassword(password:string) {
    if(password.length < 8) throw new InvalidPassword("Password too short")
  }

  updateUser(input:Partial<UserProps>) {
    console.log(Object.entries(input), "entries")
  }


}
