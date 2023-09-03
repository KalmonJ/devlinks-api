import { CreateLinksDto } from "../dtos/CreateLinksDto";
import { Link } from "../entities/Link";
import { LinkRepository } from "../repositories/LinkRepository";

export class CreateLink {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute(input: CreateLinksDto) {
    const links = input.links.map((link) => new Link(link));
    await this.linkRepository.create(links);
  }
}
