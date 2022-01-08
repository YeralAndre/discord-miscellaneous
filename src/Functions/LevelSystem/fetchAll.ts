import LevelSystemSchema from "../../Models/LevelSystemSchema";
import { FetchedGuild } from "../../Types";

export async function fetchAll() {
  let allFetched: FetchedGuild[] = await LevelSystemSchema.find();
  if (!allFetched) return [] as FetchedGuild[];
  return allFetched;
}
