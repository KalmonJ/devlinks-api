import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (__, _, cb) => {
    cb(null, path.join(__dirname, "../../temp/images"));
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ dest: "/src/infra/temp/images", storage });

export const userRoute = Router();
userRoute
  .post("/user", UserController.createUser)
  .put("/user", upload.single("image"), UserController.updateUser)
  .get("/user/:id", UserController.getUser);
