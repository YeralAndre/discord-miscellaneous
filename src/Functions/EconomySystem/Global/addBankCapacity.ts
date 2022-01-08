import { FetchedUser } from "../../../Interfaces/EconomySystem/FetchedUser";
import EconomySystemSchema from "../../../Models/EconomySystemGlobal";
import { DsMiError } from "../../../Utils/DsMiError";

export async function addBankCapacity(
  userID: string,
  capacity: number
) {
  if (isNaN(capacity)) throw new DsMiError("Capacity amount is not a number!");
  if (capacity <= 0)
    throw new DsMiError("The quantity provided is equal to or less than 0");
  let hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError("This user not exists!");
  else {
    let updatedUser = await EconomySystemSchema.findOneAndUpdate(
      {
        userID: userID,
      },
      {
        $inc: {
          bankCapacity: capacity,
        },
      }
    );
    delete updatedUser["_id"];
    delete updatedUser["__v"];
    return updatedUser as FetchedUser;
  }
}
