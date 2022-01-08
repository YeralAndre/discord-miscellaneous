import LevelSystemSchema from "../../Models/LevelSystemSchema";
import { LevelSystem } from "../../Interfaces";
import { DsMiError } from "../../Utils/DsMiError";

export async function addXp(guildID: string, userID: string, xp: number) {
  let hasUser: LevelSystem = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) {
    throw new DsMiError(
      "This user not exist! Create with createUser function!"
    );
  } else {
    let updatedUser: LevelSystem;
    updatedUser = await LevelSystemSchema.findOneAndUpdate(
      {
        guildID: guildID,
        userID: userID,
      },
      {
        $inc: {
          xp: xp,
        },
      }
    );
    if (hasUser.xp <= hasUser.maxXp * hasUser.lvl) {
      updatedUser = await LevelSystemSchema.findOneAndUpdate(
        {
          guildID: guildID,
          userID: userID,
        },
        {
          $inc: {
            lvl: 1,
          },
        }
      );
    }
    delete updatedUser["_id"];
    return updatedUser as LevelSystem;
  }
}
