import LevelSystemSchema from "../../Models/LevelSystemSchema";
import { LevelSystem } from "../../Interfaces";
import { DsMiError } from "../../Utils/DsMiError";

export async function subsXp(guildID: string, userID: string, xp: number) {
  let hasUser: LevelSystem = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) {
    throw new DsMiError(
      "This user not exist! Create with createUser function!"
    );
  } else {
    await LevelSystemSchema.findOneAndUpdate(
      {
        guildID: guildID,
        userID: userID,
      },
      {
        $inc: {
          xp: -xp,
        },
      }
    );
  }
}
