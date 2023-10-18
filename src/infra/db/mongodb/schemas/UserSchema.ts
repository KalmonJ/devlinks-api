import mongoose, { Schema, model } from "mongoose";
import { UserProps } from "../../../../core/entities/User";

const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  links: [{ type: mongoose.Types.ObjectId, ref: "Links" }],
});

export default model("Users", schema);
