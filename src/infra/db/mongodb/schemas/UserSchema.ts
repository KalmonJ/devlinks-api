import { Schema, model } from "mongoose";
import { UserProps } from "../../../../core/entities/User";

const schema = new Schema({
  _id: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  image: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

export default model<UserProps>("Users", schema);
