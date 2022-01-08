import { Schema, model } from 'mongoose';

const BankSchema: Schema = new Schema({
  guildID: {
    type: String,
  },
  userID: String,
  bankMoney: {
    type: Number,
    default: 0,
  },
  balMoney: {
    type: Number,
    default: 0,
  },
  bankCapacity: {
    type: Number,
    default: 2500,
  },
  dailyMoney: {
    type: Number,
    default: 250,
  },
  dailyRest: Number,
});

export default model('EconomyBankSchemaGuild', BankSchema);
