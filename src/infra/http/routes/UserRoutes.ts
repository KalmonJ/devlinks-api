import { Router } from "express";
import { UserController } from "../../controllers/UserController";

export const userRoute = Router();
userRoute.post("/user", UserController.createUser);
