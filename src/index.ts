import express from "express";
import { userRoute } from "./infra/http/routes/UserRoutes";
import { authRoute } from "./infra/http/routes/AuthRoutes";
import { dbConnection } from "./infra/db/mongodb/connection";
import { config } from "dotenv";
import { LinkRoute } from "./infra/http/routes/LinkRoutes";
import cors from "cors";

config();

dbConnection;
const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(express.json());
app.use(
  cors({
    allowedHeaders:
      "Content-Type, Accept, Access-Control-Allow-Headers, Authorization, credentials",
    origin: "*",
    methods: "GET, POST, DELETE, PUT",
    credentials: true,
  })
);
app.use(userRoute, authRoute, LinkRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
