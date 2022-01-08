import EconomySystem from "../../../Models/EconomySystemGlobal";
import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import { DsMiError } from "../../../Utils/DsMiError";

export async function editUser(
  userID: string,
  options: {
    bankCapacity?: number;
    dailyMoney?: number;
  } = {}
) {
  let hasUser: FetchedUser = await EconomySystem.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  else {
    let updatedUser = await EconomySystem.findOneAndUpdate(
      {
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
