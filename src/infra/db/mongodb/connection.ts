import { connect } from "mongoose";
import { config } from "dotenv";

config();

export const dbConnection = connect(process.env.URI_DATABASE ?? "")
  .then(() => {
    console.log("db connection successfully");
  })
  .catch((err) => {
    console.log(`db connection error ${err.message}`);
  });
