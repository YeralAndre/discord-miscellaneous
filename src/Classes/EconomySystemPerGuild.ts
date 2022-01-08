import { connect, connection } from 'mongoose';
import { addBankCapacity } from '../Functions/EconomySystem/Guild/addBankCapacity';
import { addMoney } from '../Functions/EconomySystem/Guild/addMoney';
import { createUser } from '../Functions/EconomySystem/Guild/createUser';
import { daily } from '../Functions/EconomySystem/Guild/daily';
import { delUser } from '../Functions/EconomySystem/Guild/delUser';
import { deposit } from '../Functions/EconomySystem/Guild/deposit';
import { guildLeaderboard } from '../Functions/EconomySystem/Guild/guildLeaderboard';
import { subsMoney } from '../Functions/EconomySystem/Guild/subsMoney';
import { userBal } from '../Functions/EconomySystem/Guild/userBal';
import { withdraw } from '../Functions/EconomySystem/Guild/withdraw';
import { MongoURI } from '../Types';
import { DsMiError } from '../Utils/DsMiError';

/**
 * Setup EconomySystem per guild.
 * @example client.economy = new EconomySystemPerGuild("MongooseURI");
 */
export default class EconomySystemPerGuild {
  constructor(mongoURL: MongoURI) {
    if (connection?.db) return;
    connect(mongoURL).catch((e) => {
      throw new DsMiError(`Error on connect to Mongoose: \n${e}`);
    });
  }
  /**
   * Add bank capacity for specific user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param capacity Amount of additional capacity to add bank.
   * @example client.economy.addBankCapacity(message.guildId, message.author.id, 100);
   */
  public addBankCapacity = addBankCapacity;
  /**
   * Add money for specific user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param amount Amount of money to add a specific user.
   * @example client.economy.addMoney(message.guildId, message.author.id, 100);
   */
  public addMoney = addMoney;
  /**
   * Create user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param dailyMoney Amount of money to add a specific user daily.
   * @param bankCapacity Capacity the user bank to create.
   * @example client.economy.createUser(message.guildId, message.author.id, 150, 2500);
   */
  public createUser = createUser;
  /**
   * Add daily money for specific user.
   * If 24 hours have not passed since the user has claimed his daily reward, he will return an Object of the remaining time.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @example client.economy.addMoney(message.guildId, message.author.id);
   */
  public daily = daily;
  /**
   * Delete user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @example client.economy.delUser(message.guildId, messsage.author.id);
   */
  public delUser = delUser;
  /**
   * Deposit money a specify user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param amount Money to deposit.
   * @example client.economy.deposit(message.guildId, message.author.id, 100);
   */
  public deposit = deposit;
  /**
   * Returns an Array of ordained users of greater than less money.
   * @param guildID ID of guild.
   * @example const leaderboard = await client.economy.leaderboard(message.guildId);
   */
  public guildLeaderboard = guildLeaderboard;
  /**
   * Remove money from the wallet to the user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param money Money to withdraw.
   * @example client.economy.subsMoney(message.guildId, message.author.id, 100);
   */
  public subsMoney = subsMoney;
  /**
   * Returns balance of user.
   * @param guildID ID of guild.
   * @param userID ID of user
   * @example const balance = await client.economy.userBal(message.guildId, message.author.id);
   */
  public userBal = userBal;
  /**
   * Remove money from the bank to a user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param money Money to withdraw.
   * @example client.economy.withdraw(message.guildId, message.author.id, 100);
   */
  public withdraw = withdraw;
}
