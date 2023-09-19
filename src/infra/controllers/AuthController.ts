import { Request, Response } from "express";
import { AuthenticateUser } from "../../core/use-cases/AuthenticateUser";
import { HashAdapter } from "../adapters/HashAdapter";
import { JwtAdapter } from "../adapters/JwtAdapter";
import { UserNotFound } from "../../core/exceptions/UserNotFound";
import { UserDatabaseRepository } from "../repositories/UserDatabaseRepository";

const userRepository = new UserDatabaseRepository();
const hashAdapter = new HashAdapter();
const jwtAdapter = new JwtAdapter();

export class AuthController {
  static async login(req: Request, res: Response) {
    const body = req.body;
    const authenticateUser = new AuthenticateUser(
      userRepository,
      hashAdapter,
      jwtAdapter
    );
    const response = await authenticateUser.execute(body);
    if (response.isLeft()) {
      if (response.error instanceof UserNotFound)
        return res.status(404).send(response.error.message);
      return res.status(400).send(response.error.message);
    }

    return res
      .status(200)
      .cookie("session", response.value, {
        domain: "http://localhost:3000",
        sameSite: "none",
      })
      .send({});
  }
}
