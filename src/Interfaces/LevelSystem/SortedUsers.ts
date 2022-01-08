import { User } from 'discord.js';

export interface SortedUsers {
  user: string | User;
  lvl: number;
  xp: number;
  top: number;
}
