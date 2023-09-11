import { Request, Response } from "express";
import { CreateLink } from "../../core/use-cases/CreateLink";
import { LinkDatabaseRepository } from "../repositories/LinkDatabaseRepository";
import { IdentifierAdapter } from "../adapters/IdentifierAdapter";
import { GetAllLinks } from "../../core/use-cases/GetAllLinks";

const linkRepository = new LinkDatabaseRepository();
const identifierAdapter = new IdentifierAdapter();

export class LinkController {
  static async createLinks(req: Request, res: Response) {
    const body = req.body;
    const createLinks = new CreateLink(linkRepository, identifierAdapter);
    const response = await createLinks.execute(body);
    if (response.isLeft()) return res.status(400).send(response.error.message);
    return res.status(200).send(response.value);
  }
  static async getAllLinks(req: Request, res: Response) {
    const params = req.params;
    const getAllLinks = new GetAllLinks(linkRepository);
    const response = await getAllLinks.execute(params.id);
    if (response.isLeft()) return res.status(404).send(response.error.message);
    return res.status(200).send(response.value);
  }
}
