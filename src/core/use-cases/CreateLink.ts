import { Either, Left, Right } from "../../utils/Either";
import { Identifier } from "../adapters/Identifier";
import { CreateLinksDto } from "../dtos/CreateLinksDto";
import { Link } from "../entities/Link";
import { InvalidLink } from "../exceptions/InvalidLink";
import { LinkRepository } from "../repositories/LinkRepository";

export class CreateLink {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly identifierAdapter: Identifier
  ) {}

  async execute(input: CreateLinksDto): Promise<Either<InvalidLink, string>> {
    const links: Link[] = [];
    let error: InvalidLink;

    input.links.forEach((link) => {
      const createdLink = Link.create({
        ...link,
      });
      if (createdLink.isLeft()) {
        error = createdLink.error;
      } else {
        links.push(createdLink.value);
      }
    });

    await this.linkRepository.create(links, input.userId);

    if (error!) {
      return Left.create(error);
    }

    return Right.create("Link successfully created");
  }
}
