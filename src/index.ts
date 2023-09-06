import express from "express";
import { userRoute } from "./infra/http/routes/UserRoutes";
import { authRoute } from "./infra/http/routes/AuthRoutes";
import { dbConnection } from "./infra/db/mongodb/connection";
import { config } from "dotenv";
config();

dbConnection;
const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(express.json());
app.use(userRoute, authRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
