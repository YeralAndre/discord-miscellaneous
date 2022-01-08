import { Message, User } from 'discord.js';
import { SortedUsers } from '../../Interfaces';
import LevelSystemSchema from '../../Models/LevelSystemSchema';
import { FetchedGuild } from '../../Types';

export async function guildLeaderboard(message: Message) {
  const hasGuild: FetchedGuild = await LevelSystemSchema.find({
    guildID: message.guildId,
  });
  if (!hasGuild || hasGuild.length <= 0) return [] as SortedUsers[];
  const userList: [string | User, number, number][] = [];
  for (const key of hasGuild) {
    const user = message.guild.members.cache.has(key.userID)
      ? message.guild.members.cache.get(key.userID).user
      : key.userID;
    userList.push([user, key.lvl, key.xp]);
  }
  userList.sort((user1, user2) => {
    return user2[1] - user1[1] || user2[2] - user1[2];
  });
  const sortedUsers: {
    user: string | User;
    lvl: number;
    xp: number;
    top: number;
  }[] = [];
  userList.forEach((x, i) => sortedUsers.push({ user: x[0], lvl: x[1], xp: x[2], top: i + 1 }));
  return sortedUsers as SortedUsers[];
}
