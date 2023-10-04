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
    const form = formidable({
      uploadDir: "src/infra/temp/images",
      filename(name, _, part, __) {
        return `${name}.${part.mimetype?.split("/")[1]}`;
      },
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        console.log(err);
        return;
      }

      if (files.image) {
        const image = files.image[0];

        try {
          const uploader = new ImageUploader();
          const imageUrl = await uploader.config().upload(image.filepath);

          const payload: UpdateUserDto = {
            _id: "",
            email: undefined,
            firstName: undefined,
            image: undefined,
            lastName: undefined,
          };

          for (const key in fields) {
            const [value]: string[] = fields[key] as string[];
            payload[key as keyof UpdateUserDto] = value;
            if (key === "image" && imageUrl) {
              payload[key] = imageUrl;
              console.log(imageUrl, "urlll");
            }
          }

          const updateUser = new UpdateUser(userRepository);
          const response = await updateUser.execute(payload);

          if (response.isLeft()) {
            return res.status(404).send(response.error.message);
          }

          return res.status(200).send(response.value);
        } catch (error) {
          return res.status(400).send("Unknown error");
        }
      } else {
        const updateUser = new UpdateUser(userRepository);
        const response = await updateUser.execute(req.body);

        if (response.isLeft()) {
          return res.status(404).send(response.error.message);
        }

        return res.status(200).send(response.value);
      }
    });
  }
}
