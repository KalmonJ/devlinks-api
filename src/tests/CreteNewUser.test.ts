import { CreateNewUser } from "../core/useCases/CreateNewUser"
import {vi} from "vitest"
import { UserInMemoryRepository } from "../infra/repositories/UserInMemoryRepository"

describe("CreateNewUser use case test", () => {

  test("Must create a new user", () => {
    const repository = new UserInMemoryRepository() 
    const createUserPayload =  {
      email: "email@email.com",
      password: "anyadadadad"
    }
    const spy =  vi.spyOn(repository, "create")
    const createNewUser =  new CreateNewUser(repository)
    createNewUser.execute(createUserPayload)
    expect(spy).toBeCalledWith(createUserPayload)
    expect(repository.users).toHaveLength(1)
  })

  test("Shouldn't create a user if I pass invalid data", () => {
    const repository = new UserInMemoryRepository() 
    const createUserPayload =  {
      email: "emailemail.com",
      password: "anyadadadad"
    }

    const createNewUser =  new CreateNewUser(repository)
    expect(createNewUser.execute(createUserPayload)).rejects.toThrowError("Invalid Email")
    expect(repository.users).toHaveLength(0)
  })

})