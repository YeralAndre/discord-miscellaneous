import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemPerGuildSchema";
import { DsMiError } from "../../../Utils/DsMiError";

export async function subsMoney(userID: string, money: number) {
  if (isNaN(money)) throw new DsMiError("Money amount is not a number!");
  if (money <= 0)
    throw new DsMiError("The quantity provided is equal to or less than 0");
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  else {
    if (hasUser.balMoney < money) {
      let updatedUser = await EconomySystemSchema.findOneAndUpdate(
        {
          userID: userID,
        },
        {
          balMoney: 0,
        }
      );
      delete updatedUser["_id"];
      return updatedUser as FetchedUser;
    } else {
      let updatedUser = await EconomySystemSchema.findOneAndUpdate(
        {
          userID: userID,
        },
        {
          $inc: {
            balMoney: -money,
          },
        }
      );
      delete updatedUser["_id"];
      return updatedUser as FetchedUser;
    }
  }
}
