import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemGlobal";
import { DsMiError } from "../../../Utils/DsMiError";

export async function createUser(
  userID: string,
  dailyMoney?: number | 250,
  bankCapacity?: number | 2500
) {
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (hasUser) throw new DsMiError("This user exists!");
  else {
    let doc = new EconomySystemSchema({
      userID: userID,
      bankMoney: 0,
      balMoney: 0,
      dailyMoney: dailyMoney,
      bankCapacity: bankCapacity,
    });
    await doc.save().catch(console.error);
    delete doc["_id"];
    return doc as FetchedUser;
  }
}
