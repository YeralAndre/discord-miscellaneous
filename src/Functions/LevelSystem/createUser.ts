import { LevelSystem } from "../../Interfaces";
import { FetchedUser } from "../../Interfaces";
import LevelSystemSchema from "../../Models/LevelSystemSchema";
import { DsMiError } from "../../Utils/DsMiError";

export async function createUser(
  guildID: string,
  userID: string,
  maxXpMultiplier?: number
) {
  let hasUser: LevelSystem = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (hasUser) throw new DsMiError("This users exists!");
  else {
    let doc = new LevelSystemSchema({
      guildID: guildID,
      userID: userID,
      xp: 1,
      lvl: 1,
      maxXp: maxXpMultiplier,
    });
    await doc.save();
    delete doc["_id"];
    return doc as FetchedUser;
  }
}
