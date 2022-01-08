import { FetchedUser } from "../../Interfaces";
import LevelSystemSchema from "../../Models/LevelSystemSchema";

export async function fetchUser(guildID: string, userID: string) {
  let hasUser: FetchedUser = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) return undefined;
  else return hasUser;
}
