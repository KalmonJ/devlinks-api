import { InvalidLink } from "../exceptions/InvalidLink";

export interface LinkProps {
  platform: string;
  link: string;
}

export class Link {
  props: LinkProps;
  constructor(props: LinkProps) {
    this.validateLink(props.link);
    this.props = props;
  }

  validateLink(link: string) {
    const linkRgx = /^https:\/\/.+/g;
    const isValidLink = linkRgx.test(link);
    if (!isValidLink) {
      throw new InvalidLink();
    }
  }
}
