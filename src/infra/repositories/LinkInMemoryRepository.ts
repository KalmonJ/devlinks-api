import { Link } from "../../core/entities/Link";
import { LinkRepository } from "../../core/repositories/LinkRepository";

export class LinkInMemoryRepository implements LinkRepository {
  links: Link[][] = [];

  async create(input: Link[]): Promise<void> {
    this.links.push(input);
  }
}
