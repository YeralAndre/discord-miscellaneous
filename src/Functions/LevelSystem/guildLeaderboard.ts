import { Message, User } from "discord.js";
import { SortedUsers } from "../../Interfaces";
import LevelSystemSchema from "../../Models/LevelSystemSchema";
import { FetchedGuild } from "../../Types";

export async function guildLeaderboard(message: Message) {
  let hasGuild: FetchedGuild = await LevelSystemSchema.find({
    guildID: message.guildId,
  });
  if (!hasGuild || hasGuild.length <= 0) return [] as SortedUsers[];
  let userList: Array<[string | User, number, number]> = [];
  for (var key in hasGuild) {
    let user = message.guild.members.cache.has(hasGuild[key].userID)
      ? message.guild.members.cache.get(hasGuild[key].userID).user
      : hasGuild[key].userID;
    userList.push([user, hasGuild[key].lvl, hasGuild[key].xp]);
  }
  userList.sort((user1, user2) => {
    return user2[1] - user1[1] || user2[2] - user1[2];
  });
  let sortedUsers: Array<{
    user: string | User;
    lvl: number;
    xp: number;
    top: number;
  }>;
  Array(userList)[0].forEach((x, i) =>
    sortedUsers.push({ user: x[0], lvl: x[1], xp: x[2], top: i + 1 })
  );
  return sortedUsers as SortedUsers[];
}
