import { FetchedUser } from '../../../Interfaces/EconomySystem/FetchedUser';
import EconomySystemSchema from '../../../Models/EconomySystemGlobal';
import { DsMiError } from '../../../Utils/DsMiError';

export async function addMoney(userID: string, money: number) {
  if (isNaN(money)) throw new DsMiError('Money amount is not a number!');
  if (money <= 0) throw new DsMiError('The quantity provided is equal to or less than 0');
  const hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError('This user not exists!');
  else {
    const updatedUser = await EconomySystemSchema.findOneAndUpdate(
      {
        userID: userID,
      },
      {
        $inc: {
          balMoney: money,
        },
      },
    );
    delete updatedUser['_id'];
    delete updatedUser['__v'];
    return updatedUser as FetchedUser;
  }
}
