import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemPerGuildSchema";
import { DsMiError } from "../../../Utils/DsMiError";

export async function guildLeaderboard(guildID: string) {
  let hasGuild = await EconomySystemSchema.find({ guildID: guildID });
  if (!hasGuild) throw new DsMiError("This guild not exists!");
  let sortedData = await EconomySystemSchema.find({ guildID: guildID })
    .sort([["balMoney", "descending"]])
    .exec();
  return sortedData.map((x) => {
    return {
      userID: x.userID,
      bankMoney: x.bankMoney,
      balMoney: x.balMoney,
      dailyMoney: x.dailyMoney,
      bankCapacity: x.bankCapacity,
      dailyRest: x.dailyRest,
    };
  }) as FetchedUser[];
}
