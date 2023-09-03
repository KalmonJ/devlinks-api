import { Request, Response } from "express";
import { CreateNewUser } from "../../core/use-cases/CreateNewUser";
import { HashAdapter } from "../adapters/HashAdapter";
import { UserInMemoryRepository } from "../repositories/UserInMemoryRepository";
import { IdentifierAdapter } from "../adapters/IdentifierAdapter";

const hashAdapter = new HashAdapter();
const userRepository = new UserInMemoryRepository();
const identifier = new IdentifierAdapter();

export class UserController {
  static async createUser(req: Request, res: Response) {
    const body = req.body;
    const creteNewUser = new CreateNewUser(
      userRepository,
      hashAdapter,
      identifier
    );
    const response = await creteNewUser.execute(body);
    if (response.isLeft()) {
      return res.status(400).send(response.error.message);
    }
    return res.status(201).send(response.value.id);
  }
}
