import { Identifier } from "../../core/adapters/Identifier";
import { randomUUID } from "node:crypto";

export class IdentifierAdapter implements Identifier {
  generate(): string {
    return randomUUID();
  }
}
