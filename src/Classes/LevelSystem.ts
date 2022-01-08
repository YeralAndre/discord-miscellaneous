import { addXp } from "../Functions/LevelSystem/addXp";
import { addLvL } from "../Functions/LevelSystem/addLvL";
import { connect } from "mongoose";
import { DsMiError } from "../Utils/DsMiError";
import { createUser } from "../Functions/LevelSystem/createUser";
import { delGuild } from "../Functions/LevelSystem/delGuild";
import { delUser } from "../Functions/LevelSystem/delUser";
import { existsUser } from "../Functions/LevelSystem/existsUser";
import { fetchAll } from "../Functions/LevelSystem/fetchAll";
import { fetchGuild } from "../Functions/LevelSystem/fetchGuild";
import { fetchUser } from "../Functions/LevelSystem/fetchUser";
import { guildLeaderboard } from "../Functions/LevelSystem/guildLeaderboard";
import { setLvl } from "../Functions/LevelSystem/setLvL";
import { setXp } from "../Functions/LevelSystem/setXp";
import { subsLvL } from "../Functions/LevelSystem/subsLvL";
import { subsXp } from "../Functions/LevelSystem/subsXp";
import { xpFor } from "../Functions/LevelSystem/xpFor";
import { MongoURI } from "../Types";

/**
 * Setup LevelSystem class.
 * @example client.levels = new LevelSystem("MongooseURI");
 */
export default class LevelSystem {
  /**
   * Connect to Mongoose.
   * @param mongoURL Mongoose URI to connect.
   */
  constructor(mongoURL: MongoURI) {
    connect(mongoURL)
      .then(() => {})
      .catch((e: Error) => {
        throw new DsMiError(`Error on connect to Mongoose: \n${e}`);
      });
  }
  /**
   * Add levels to a specific user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param lvl Levels to add.
   * @example client.levels.addLvl(message.guildId, message.author.id, 5);
   */
  public addLvL = addLvL;
  /**
   * Add experience to a specific user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param xp Experience to add.
   * @example client.levels.addXp(message.guildId, message.author.id, 5);
   */
  public addXp = addXp;
  /**
   * Create user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param maxXpMultiplier The XP multiplier that will be to define how much XP the user needs to level up.
   * @example client.levels.createUser(message.guildId, message.author.id, 200); //If the user is level 5, the XP required would be: 5 * 200 = 1000.
   */
  public createUser = createUser;
  /**
   * Delete guild.
   * @param guildID ID of guild.
   * @example client.levels.delGuild(message.guildId);
   */
  public delGuild = delGuild;
  /**
   * Delete user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @example client.levels.delUser(message.guildId, message.author.id);
   */
  public delUser = delUser;
  /**
   * Returns a Boolean that if the user exists.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @example const existsUser = await client.levels.existsUser(message.guildId, message.author.id);
   */
  public existsUser = existsUser;
  /**
   * Fetch all data.
   * @example const allData = await client.levels.fetchAll();
   */
  public fetchAll = fetchAll;
  /**
   * Fetch a guild data.
   * @param guildID ID of guild.
   * @example const guildData = await client.levels.fetchGuild(message.guildId);
   */
  public fetchGuild = fetchGuild;
  /**
   * Fetch a user data.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @example const userData = await client.levels.fetchUser(message.guildId, message.author.id);
   */
  public fetchUser = fetchUser;
  /**
   * Returns a Array of users data sorted.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @example const guildSortedData = await client.levels.guildLeaderboard(message.guildId);
   */
  public guildLeaderboard = guildLeaderboard;
  /**
   * Set a specific level to a user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param lvl Level to set.
   * @example client.levels.setLvl(message.guildId, message.author.id, 20);
   */
  public setLvL = setLvl;
  /**
   * Set a specific XP to a user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param xp XP to set.
   * @example client.levels.setXp(message.guildId, message.author.id, 200);
   */
  public setXp = setXp;
  /**
   * Remove levels to a specific user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param lvl Levels to substract.
   * @example client.levels.subsLvl(message.guildId, message.author.id, 5);
   */
  public subsLvL = subsLvL;
  /**
   * Remove XP to a specific user.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @param xp XP to substract.
   * @example client.levels.subsXp(message.guildId, message.author.id, 250);
   */
  public subXp = subsXp;
  /**
   * Returns the missing experience to level up.
   * @param guildID ID of guild.
   * @param userID ID of user.
   * @example const missingXp = await client.levels.xpFor(message.guildId, message.author.id);
   */
  public xpFor = xpFor;
}
