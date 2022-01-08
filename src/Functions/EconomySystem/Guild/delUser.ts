import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemPerGuildSchema";
import { DsMiError } from "../../../Utils/DsMiError";

export async function delUser(guildID: string, userID: string) {
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  else {
    let doc = await EconomySystemSchema.findOneAndDelete({
      guildID: guildID,
      userID: userID,
    });
    delete doc["_id"];
    delete doc["__v"];
    return doc as FetchedUser;
  }
}
