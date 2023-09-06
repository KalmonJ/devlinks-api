import { Router } from "express";
import { AuthController } from "../../controllers/AuthController";

export const authRoute = Router();
authRoute.post("/auth", AuthController.login);
