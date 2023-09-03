import { Link, LinkProps } from "../entities/Link";

export interface LinkRepository {
  create(input: Link[]): Promise<void>;
}
