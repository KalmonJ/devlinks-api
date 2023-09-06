import { Request, Response } from "express";
import { CreateNewUser } from "../../core/use-cases/CreateNewUser";
import { HashAdapter } from "../adapters/HashAdapter";
import { IdentifierAdapter } from "../adapters/IdentifierAdapter";
import { UserDatabaseRepository } from "../repositories/UserDatabaseRepository";
import { UpdateUser } from "../../core/use-cases/UpdateUser";

const hashAdapter = new HashAdapter();
const userRepository = new UserDatabaseRepository();
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
    return res.status(201).send(response.value._id);
  }
  static async updateUser(req: Request, res: Response) {
    const body = req.body;
    const updateUser = new UpdateUser(userRepository);
    const response = await updateUser.execute(body);
    if (response.isLeft()) {
      return res.status(404).send(response.error.message);
    }
    return res.status(200).send(response.value);
  }
}
