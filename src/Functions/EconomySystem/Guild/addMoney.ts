import { FetchedUser } from '../../../Interfaces/EconomySystem/FetchedUser';
import EconomySystemSchema from '../../../Models/EconomySystemPerGuildSchema';
import { DsMiError } from '../../../Utils/DsMiError';

export async function addMoney(guildID: string, userID: string, money: number) {
  if (isNaN(money)) throw new DsMiError('Money amount is not a number!');
  if (money <= 0) throw new DsMiError('The quantity provided is equal to or less than 0');
  const hasUser: FetchedUser = await EconomySystemSchema.findOne({
    guildID: guildID,
    userID: userID,
  });
  if (!hasUser) throw new DsMiError('This user not exists!');
  else {
    const updatedUser = await EconomySystemSchema.findOneAndUpdate(
      {
        guildID: guildID,
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
