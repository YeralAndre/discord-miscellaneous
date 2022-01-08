import { Schema, model } from "mongoose";

let LevelSystemSchema: Schema = new Schema({
  guildID: {
    type: String,
  },
  userID: String,
  lvl: {
    type: Number,
    default: 0,
  },
  xp: {
    type: Number,
    default: 1,
  },
});

export default model("levelSystemSchema", LevelSystemSchema);
