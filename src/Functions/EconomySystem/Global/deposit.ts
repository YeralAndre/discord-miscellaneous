import { FetchedUser } from '../../../Interfaces/EconomySystem/FetchedUser';
import EconomySystemSchema from '../../../Models/EconomySystemGlobal';
import { DsMiError } from '../../../Utils/DsMiError';

export async function deposit(userID: string, amount: number | 'all') {
  const hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError('This user not exists!');
  if ((amount as number) > hasUser.balMoney) {
    const depositNumber = (amount as number) - hasUser.balMoney;
    await EconomySystemSchema.updateOne(
      {
        userID: userID,
      },
      {
        $inc: {
          bankMoney: depositNumber,
          balMoney: -depositNumber,
        },
      },
    );
    return depositNumber as number;
  }
  if ((amount as number) + hasUser.bankCapacity > hasUser.bankCapacity || amount === 'all') {
    const add = hasUser.bankCapacity - hasUser.bankMoney;
    if (add > hasUser.balMoney) {
      await EconomySystemSchema.updateOne(
        {
          userID: userID,
        },
        {
          $inc: {
            bankMoney: hasUser.balMoney,
            balMoney: -hasUser.balMoney,
          },
        },
      );
      return add;
    } else {
      await EconomySystemSchema.updateOne(
        {
          userID: userID,
        },
        {
          $inc: {
            bankMoney: add,
            balMoney: -add,
          },
        },
      );
      return add;
    }
  }
}
