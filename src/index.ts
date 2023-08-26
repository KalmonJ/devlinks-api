import express from "express"
import { CreateNewUser } from "./core/useCases/CreateNewUser"
import { UserInMemoryRepository } from "./infra/repositories/UserInMemoryRepository"

const app =  express()
const PORT =  3030

app.use(express.json())

const user  =  new CreateNewUser(new UserInMemoryRepository())
user.execute({email: "sadahduad@auhduadh.com", password: "sduausdhaudhaudh"})

app.listen(() => {
  console.log(`Server running on http://localhost:${PORT}`)
})