import { LevelSystem } from "../../Interfaces";
import { FetchedUser } from "../../Interfaces";
import LevelSystemSchema from "../../Models/LevelSystemSchema";
import { DsMiError } from "../../Utils/DsMiError";

export async function delUser(guildID: string, userID: string) {
  let hasUser: LevelSystem = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This users not exists!");
  let deletedUser: FetchedUser = await LevelSystemSchema.findOneAndDelete({
    guildID: guildID,
    userID: userID,
  });
  delete deletedUser["__v"];
  delete deletedUser["_id"];
  return deletedUser;
}
