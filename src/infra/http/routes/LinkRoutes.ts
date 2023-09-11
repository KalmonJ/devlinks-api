import { Router } from "express";
import { LinkController } from "../../controllers/LinkController";

export const LinkRoute = Router();
LinkRoute.post("/link", LinkController.createLinks).get(
  "/link/:id",
  LinkController.getAllLinks
);
