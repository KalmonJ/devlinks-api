import { config } from "dotenv";

import { Jwt } from "../../core/adapters/Jwt";
import * as jwt from "jsonwebtoken";

config();

export class JwtAdapter implements Jwt {
  sign(payload = {}): string {
    return jwt.sign(payload, process.env.JWT_SECRET ?? "");
  }
}
