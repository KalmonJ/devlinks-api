import { Either, Left, Right } from "../../utils/Either";
import { InvalidLink } from "../exceptions/InvalidLink";

export interface LinkProps {
  _id?: string;
  platform: string;
  link: string;
}

export class Link {
  props: LinkProps;
  private constructor(props: LinkProps) {
    this.props = props;
  }

  static validateLink(link: string) {
    const linkRgx = /^https:\/\/.+/g;
    const isValidLink = linkRgx.test(link);
    if (!isValidLink) {
      return Left.create(new InvalidLink());
    }

    return Right.create(link);
  }

  static create(props: LinkProps): Either<InvalidLink, Link> {
    const validatedLink = this.validateLink(props.link);
    if (validatedLink.isLeft()) {
      return Left.create(validatedLink.error);
    }
    return Right.create(new Link(props));
  }
}
