import express from "express";
import { userRoute } from "./infra/http/routes/UserRoutes";

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(userRoute);

app.get("/", (req, res) => {
  return res.status(200).send({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
