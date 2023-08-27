import { AuthenticateUser } from "../core/useCases/AuthenticateUser";
import { UserInMemoryRepository } from "../infra/repositories/UserInMemoryRepository";
import { HashAdapter } from "../infra/adapters/HashAdapter";
import { CreateNewUser } from "../core/useCases/CreateNewUser";
import { IdentifierAdapter } from "../infra/adapters/IdentifierAdapter";
import { JwtAdapter } from "../infra/adapters/JwtAdapter";

describe("AuthenticateUser use case test", () => {
  test("Should authenticate a user", async () => {
    const input = {
      email: "email@email.com",
      password: "new-password-123",
    };

    const hashAdapter = new HashAdapter();
    const userRepository = new UserInMemoryRepository();
    const identifierAdapter = new IdentifierAdapter();
    const jwtAdapter = new JwtAdapter();
    const repositorySpy = jest.spyOn(userRepository, "findByEmail");
    const hashAdapterSpy = jest.spyOn(hashAdapter, "compare");

    const createNewUser = new CreateNewUser(
      userRepository,
      hashAdapter,
      identifierAdapter
    );
    await createNewUser.execute(input);
    const authenticateUser = new AuthenticateUser(
      userRepository,
      hashAdapter,
      jwtAdapter
    );
    const response = await authenticateUser.execute(input);
    expect(response.accessToken).toBeDefined();
    expect(repositorySpy).toBeCalledWith(input.email);
    expect(hashAdapterSpy).toBeCalled();
  });
});
