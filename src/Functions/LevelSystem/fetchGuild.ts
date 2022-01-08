import LevelSystemSchema from '../../Models/LevelSystemSchema';
import { FetchedGuild } from '../../Types';

export async function fetchGuild(guildID: string) {
  const fetchedGuild: FetchedGuild = await LevelSystemSchema.find({
    guildID: guildID,
  });
  if (!fetchedGuild || fetchedGuild.length <= 0) return [] as FetchedGuild;
  return fetchedGuild;
}
