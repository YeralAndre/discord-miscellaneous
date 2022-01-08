import { LevelSystem } from "../../Interfaces/LevelSystem/LevelSystem";
import LevelSystemSchema from "../../Models/LevelSystemSchema";

export async function existsUser(guildID: string, userID: string) {
  let hasUser: LevelSystem = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (hasUser) {
    return true;
  } else return false;
}
