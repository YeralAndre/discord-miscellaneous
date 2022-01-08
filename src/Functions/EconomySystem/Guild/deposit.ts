import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemPerGuildSchema";
import { DsMiError } from "../../../Utils/DsMiError";

export async function deposit(
  guildID: string,
  userID: string,
  amount: number | "all"
) {
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    guildID: guildID,
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
          guildID: guildID,
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
      return updatedUser as FetchedUser;
    } else {
      let amount = add;
      let updatedUser = await EconomySystemSchema.findOneAndUpdate(
        {
          guildID: guildID,
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
      return updatedUser as FetchedUser;
    }
  }
}
