import { FetchedUser } from '../../Interfaces';
import LevelSystemSchema from '../../Models/LevelSystemSchema';
import { DsMiError } from '../../Utils/DsMiError';

export async function delGuild(guildID: string) {
  const hasGuild: FetchedUser[] = await LevelSystemSchema.findOne({
    guildID: guildID,
  });
  if (!hasGuild) throw new DsMiError('This guild not exists!');
  await LevelSystemSchema.remove({ guildID: guildID });
}
