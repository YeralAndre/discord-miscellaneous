import LevelSystemSchema from "../../Models/LevelSystemSchema";
import { LevelSystem } from "../../Interfaces";
import { DsMiError } from "../../Utils/DsMiError";

export async function addLvL(guildID: string, userID: string, lvl: number) {
  let hasUser: LevelSystem = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) {
    throw new DsMiError(
      "This user not exist! Create with createUser function!"
    );
  } else {
    let updatedUser = await LevelSystemSchema.findOneAndUpdate(
      {
        guildID: guildID,
        userID: userID,
      },
      {
        $inc: {
          lvl: lvl,
        },
      }
    );
    delete updatedUser["_id"];
    return updatedUser as LevelSystem;
  }
}
