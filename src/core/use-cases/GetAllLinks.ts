import { Either, Left, Right } from "../../utils/Either";
import { LinkProps } from "../entities/Link";
import { LinksNotFound } from "../exceptions/LinksNotFound";
import { LinkRepository } from "../repositories/LinkRepository";

export class GetAllLinks {
  constructor(private readonly linkRepository: LinkRepository) {}
  async execute(userId: string): Promise<Either<LinksNotFound, LinkProps[]>> {
    const links = await this.linkRepository.findByUserId(userId);

    if (!links) return Left.create(new LinksNotFound());
    return Right.create(links);
  }
}
