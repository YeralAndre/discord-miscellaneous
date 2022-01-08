import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemGlobal";
import { DsMiError } from "../../../Utils/DsMiError";

export async function deposit(
  userID: string,
  amount: number | "all"
) {
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  if (amount > hasUser.balMoney)
    throw new DsMiError("You don't have enough money to deposit!");
  if (
    (amount as number) + hasUser.bankCapacity > hasUser.bankCapacity ||
    amount == "all"
  ) {
    let add = hasUser.bankCapacity - hasUser.bankMoney;
    if (add > hasUser.balMoney) {
      let updatedUser = await EconomySystemSchema.findOneAndUpdate(
        {
          userID: userID,
        },
        {
          $inc: {
            bankMoney: hasUser.balMoney,
            balMoney: -hasUser.balMoney,
          },
        }
      );
      delete updatedUser["_id"];
      delete updatedUser["__v"];
      return updatedUser as FetchedUser;
    } else {
      let updatedUser = await EconomySystemSchema.findOneAndUpdate(
        {
          userID: userID,
        },
        {
          $inc: {
            bankMoney: add,
            balMoney: -add,
          },
        }
      );
      delete updatedUser["_id"];
      delete updatedUser["__v"];
      return updatedUser as FetchedUser;
    }
  }
}
