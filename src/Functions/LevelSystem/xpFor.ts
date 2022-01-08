import LevelSystemSchema from '../../Models/LevelSystemSchema';
import { LevelSystem } from '../../Interfaces';
import { DsMiError } from '../../Utils/DsMiError';

export async function xpFor(guildID: string, userID: string) {
  const hasUser: LevelSystem = await LevelSystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) {
    throw new DsMiError('This user not exist! Create with createUser function!');
  } else {
    return hasUser.maxXp - hasUser.xp;
  }
}
