import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemPerGuildSchema from "../../../Models/EconomySystemPerGuildSchema";
import { DsMiError } from "../../../Utils/DsMiError";

export async function editUser(
  guildID: string,
  userID: string,
  options: {
    bankCapacity?: number;
    dailyMoney?: number;
  } = {}
) {
  let hasUser: FetchedUser = await EconomySystemPerGuildSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  else {
    let updatedUser = await EconomySystemPerGuildSchema.findOneAndUpdate(
      {
        guildID: guildID,
        userID: userID,
      },
      {
        bankCapacity: options.bankCapacity ?? hasUser.bankCapacity,
        dailyMoney: options.dailyMoney ?? hasUser.dailyMoney,
      }
    );
    delete updatedUser["_id"];
    return updatedUser as FetchedUser;
  }
}
