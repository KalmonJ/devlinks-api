import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
  links: [
    {
      platform: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});

export default model("Links", schema);
