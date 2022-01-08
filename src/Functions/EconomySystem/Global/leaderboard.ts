import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemGlobal";
import { DsMiError } from "../../../Utils/DsMiError";

export async function leaderboard() {
  let has = await EconomySystemSchema.find();
  if (!has) throw new DsMiError("No data available!");
  let sortedData = await EconomySystemSchema.find()
    .sort([["balMoney", "descending"]])
    .exec();
  return sortedData.map((x, i) => {
    return {
      userID: x.userID,
      bankMoney: x.bankMoney,
      balMoney: x.balMoney,
      dailyMoney: x.dailyMoney,
      bankCapacity: x.bankCapacity,
      dailyRest: x.dailyRest,
      top: i + 1,
    };
  }) as FetchedUser[];
}
