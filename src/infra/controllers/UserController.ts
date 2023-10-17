import { NextFunction, Request, Response } from "express";
import { CreateNewUser } from "../../core/use-cases/CreateNewUser";
import { HashAdapter } from "../adapters/HashAdapter";
import { IdentifierAdapter } from "../adapters/IdentifierAdapter";
import { UserDatabaseRepository } from "../repositories/UserDatabaseRepository";
import { UpdateUser } from "../../core/use-cases/UpdateUser";
import formidable from "formidable";
import { ImageUploader } from "../adapters/ImageUploader";
import { UpdateUserDto } from "../../core/dtos/UpdateUserDto";
import { GetUser } from "../../core/use-cases/GetUser";

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
    return res.status(201).send(response.value);
  }

  static async getUser(req: Request, res: Response) {
    const getUser = new GetUser(userRepository);
    const response = await getUser.execute(req.params.id);
    if (response.isLeft()) {
      return res.status(404).send(response.error.message);
    }
    return res.status(200).send(response.value);
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    const updateUser = new UpdateUser(userRepository);
    const upload = new ImageUploader();
    const url = await upload.config().upload(req.file?.path ?? "");
    const response = await updateUser.execute({ ...req.body, image: url });

    if (response.isLeft()) {
      return res.status(404).send(response.error.message);
    }

    return res.status(200).send(response.value);
  }
}
