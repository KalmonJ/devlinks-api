import { UpdateUserDto } from "../core/dtos/UpdateUserDto";
import { UserProps } from "../core/entities/User";
import { CreateNewUser } from "../core/use-cases/CreateNewUser";
import { UpdateUser } from "../core/use-cases/UpdateUser";
import { HashAdapter } from "../infra/adapters/HashAdapter";
import { IdentifierAdapter } from "../infra/adapters/IdentifierAdapter";
import { UserInMemoryRepository } from "../infra/repositories/UserInMemoryRepository";

describe("UpdateUser use case test", () => {
  test("Should update a user", async () => {
    const input: UpdateUserDto = {
      id: "shwjhduhw",
      email: "updatedemail@email.com",
      firstName: "Jhon",
    };

    const userRepository = new UserInMemoryRepository();
    const hashAdapter = new HashAdapter();
    const identifier = new IdentifierAdapter();
    const createNewUser = new CreateNewUser(
      userRepository,
      hashAdapter,
      identifier
    );
    await createNewUser.execute({ email: "email@email.com", password: "123" });

    const updateUser = new UpdateUser(userRepository);
    const response = await updateUser.execute(input);

    if (response.isRight()) {
      expect(response.value).toBe("User successfully updated");
    }
  });
});
