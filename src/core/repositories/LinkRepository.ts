import { Link, LinkProps } from "../entities/Link";

export interface LinkRepository {
  create(input: Link[], userId: string): Promise<void>;
  findByUserId(userId: string): Promise<LinkProps[] | null>;
}
