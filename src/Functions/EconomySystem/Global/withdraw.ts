import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemGlobal";
import { DsMiError } from "../../../Utils/DsMiError";

export async function withdraw(userID: string, amount: number | "all") {
  if ((amount as number) < 0)
    throw new DsMiError(
      "The amount to withdraw from your bank account cannot be 0 or less!"
    );
  if (amount != "all" && isNaN(amount as unknown as number))
    throw new DsMiError("The amount is invalid");
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  if ((amount as number) > hasUser.bankMoney)
    throw new DsMiError(
      "The amount to deposit is greater than the one you have"
    );
  if (amount == "all") {
    let all = hasUser.bankMoney;
    let updatedUser = await EconomySystemSchema.findOneAndUpdate(
      {
        userID: userID,
      },
      {
        $inc: {
          balMoney: all,
          bankMoney: -all,
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
          balMoney: amount,
          bankMoney: -amount,
        },
      }
    );
    delete updatedUser["_id"];
    delete updatedUser["__v"];
    return updatedUser as FetchedUser;
  }
}
