import { FetchedUser } from '../../../Interfaces/EconomySystem/FetchedUser';
import EconomySystemSchema from '../../../Models/EconomySystemGlobal';
import { DsMiError } from '../../../Utils/DsMiError';

export async function deposit(userID: string, amount: number | 'all') {
  const hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError('This user not exists!');
  if ((amount as number) > hasUser.balMoney || amount === 'all') {
    let allAmount: number;
    if (hasUser.balMoney > hasUser.bankCapacity - hasUser.bankMoney)
      allAmount = hasUser.bankCapacity - hasUser.bankMoney;
    else allAmount = hasUser.balMoney;
    await EconomySystemSchema.updateOne(
      {
        userID: userID,
      },
      {
        $inc: {
          bankMoney: allAmount,
          balMoney: -allAmount,
        },
      },
    );
    return hasUser.balMoney as number;
  }
  let amountDep: number;
  if ((amount as number) > hasUser.bankCapacity - hasUser.bankMoney)
    amountDep = hasUser.bankCapacity - hasUser.bankMoney;
  else amountDep = amount;
  await EconomySystemSchema.updateOne(
    {
      userID: userID,
    },
    {
      $inc: {
        bankMoney: amountDep,
        balMoney: -amountDep,
      },
    },
  );
  return amountDep as number;
}
