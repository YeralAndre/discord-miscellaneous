import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import { ParsedDailyRest } from "../../../Interfaces/EconomySystem/ParsedDailyRest";
import EconomySystemSchema from "../../../Models/EconomySystemGlobal";
import { DsMiError } from "../../../Utils/DsMiError";
import { parseMs } from "../../../Utils/Functions/parseMs";
let day = 86400000;

export async function daily(userID: string) {
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  if (day - (Date.now() - (await hasUser.dailyRest)) > 0) {
    return parseMs(
      day - (Date.now() - (await hasUser.dailyRest))
    ) as ParsedDailyRest;
  } else {
    let updatedUser = await EconomySystemSchema.findOneAndUpdate(
      {
        userID: userID,
      },
      {
        dailyRest: Date.now(),
        $inc: {
          balMoney: hasUser.dailyMoney,
        },
      }
    );
    delete updatedUser["_id"];
    delete updatedUser["__v"];
    return updatedUser as FetchedUser;
  }
}
