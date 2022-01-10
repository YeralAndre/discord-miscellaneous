import { connect, connection } from 'mongoose';
import { addBankCapacity } from '../Functions/EconomySystem/Global/addBankCapacity';
import { addMoney } from '../Functions/EconomySystem/Global/addMoney';
import { createUser } from '../Functions/EconomySystem/Global/createUser';
import { daily } from '../Functions/EconomySystem/Global/daily';
import { delUser } from '../Functions/EconomySystem/Global/delUser';
import { deposit } from '../Functions/EconomySystem/Global/deposit';
import { leaderboard } from '../Functions/EconomySystem/Global/leaderboard';
import { subsMoney } from '../Functions/EconomySystem/Global/subsMoney';
import { userBal } from '../Functions/EconomySystem/Global/userBal';
import { withdraw } from '../Functions/EconomySystem/Global/withdraw';
import { MongoURI } from '../Types';
import { DsMiError } from '../Utils/DsMiError';

/**
 * Setup global EconomySystem.
 * @example client.economy = new EconomySystemGlobal("MongooseURI");
 */
export default class EconomySystemGlobal {
  constructor(mongoURL: MongoURI) {
    if (connection?.db) return;
    connect(mongoURL).catch((e) => {
      throw new DsMiError(`Error on connect to Mongoose: \n${e}`);
    });
  }
  /**
   * Add bank capacity for specific user.
   * @param userID ID of user.
   * @param capacity Amount of additional capacity to add bank.
   * @example client.economy.addBankCapacity(message.author.id, 100);
   */
  public addBankCapacity = addBankCapacity;
  /**
   * Add money for specific user.
   * @param userID ID of user.
   * @param amount Amount of money to add a specific user.
   * @example client.economy.addMoney(message.author.id, 100);
   */
  public addMoney = addMoney;
  /**
   * Create user.
   * @param userID ID of user.
   * @param dailyMoney Amount of money to add a specific user daily.
   * @param bankCapacity Capacity the user bank to create.
   * @example client.economy.createUser(message.author.id, 150, 2500);
   */
  public createUser = createUser;
  /**
   * Add daily money for specific user.
   * If 24 hours have not passed since the user has claimed his daily reward, he will return an Object of the remaining time.
   * @param userID ID of user.
   * @example client.economy.addMoney(message.author.id);
   */
  public daily = daily;
  /**
   * Delete user.
   * @param userID ID of user.
   * @example client.economy.delUser(messsage.author.id);
   */
  public delUser = delUser;
  /**
   * Deposit money a specify user.
   * @param userID ID of user.
   * @param amount Money to deposit.
   * @returns The money that was deposited.
   * @example client.economy.deposit(message.author.id, 100);
   */
  public deposit = deposit;
  /**
   * Returns an Array of ordained users of greater than less money.
   * @example const leaderboard = await client.economy.leaderboard();
   */
  public leaderboard = leaderboard;
  /**
   * Remove money from the wallet to the user.
   * @param userID ID of user.
   * @param money Money to withdraw.
   * @example client.economy.subsMoney(message.author.id, 100);
   */
  public subsMoney = subsMoney;
  /**
   * Returns balance of user.
   * @param userID ID of user
   * @example const balance = await client.economy.userBal(message.author.id);
   */
  public userBal = userBal;
  /**
   * Remove money from the bank to a user.
   * @param userID ID of user.
   * @param money Money to withdraw.
   * @returns The money that was withdrawn.
   * @example client.economy.withdraw(message.author.id, 100);
   */
  public withdraw = withdraw;
}
