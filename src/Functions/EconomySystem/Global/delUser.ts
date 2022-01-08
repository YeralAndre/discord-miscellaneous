import { FetchedUser } from '../../../Interfaces/EconomySystem/FetchedUser';
import EconomySystemSchema from '../../../Models/EconomySystemGlobal';
import { DsMiError } from '../../../Utils/DsMiError';

export async function delUser(userID: string) {
  const hasUser: FetchedUser = await EconomySystemSchema.findOne({
    userID: userID,
  });
  if (!hasUser) throw new DsMiError('This user not exists!');
  else {
    const doc = await EconomySystemSchema.findOneAndDelete({
      userID: userID,
    });
    delete doc['_id'];
    delete doc['__v'];
    return doc as FetchedUser;
  }
}
