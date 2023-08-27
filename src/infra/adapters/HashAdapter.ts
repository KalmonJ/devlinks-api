import { Hash } from "../../core/adapters/Hash";
import { hash, compare } from "bcrypt";

export class HashAdapter implements Hash {
  async encrypt(data: string, salt?: string | number): Promise<string> {
    return await hash(data, salt ?? 10);
  }

  async compare(data: string, encrypted: string) {
    return await compare(data, encrypted);
  }
}
