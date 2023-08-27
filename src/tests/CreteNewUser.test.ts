import { CreateNewUser } from "../core/use-cases/CreateNewUser";
import { UserInMemoryRepository } from "../infra/repositories/UserInMemoryRepository";
import { HashAdapter } from "../infra/adapters/HashAdapter";
import { IdentifierAdapter } from "../infra/adapters/IdentifierAdapter";

describe("CreateNewUser use case test", () => {
  test("Must create a new user", async () => {
    const repository = new UserInMemoryRepository();
    const hashAdapter = new HashAdapter();
    const identifierAdapter = new IdentifierAdapter();
    const createUserPayload = {
      email: "email@email.com",
      password: "anyadadadad",
    };
    const spy = jest.spyOn(repository, "create");
    const createNewUser = new CreateNewUser(
      repository,
      hashAdapter,
      identifierAdapter
    );
    await createNewUser.execute(createUserPayload);
    expect(spy).toBeCalledTimes(1);
    expect(repository.users).toHaveLength(1);
  });
  test("Shouldn't create a user if I pass invalid data", () => {
    const repository = new UserInMemoryRepository();
    const identifierAdapter = new IdentifierAdapter();
    const createUserPayload = {
      email: "emailemail.com",
      password: "123",
    };
    const hashAdapter = new HashAdapter();
    const createNewUser = new CreateNewUser(
      repository,
      hashAdapter,
      identifierAdapter
    );
    expect(createNewUser.execute(createUserPayload)).rejects.toThrowError(
      "Invalid Email"
    );
    expect(repository.users).toHaveLength(0);
  });
});
