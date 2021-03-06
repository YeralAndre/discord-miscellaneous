
# discord-miscellaneous

## What is discord-miscellaneous?

**discord-miscellaneous** is an easy and easy-to-understand package, which brings class and useful functions for your Discord Bot.

## Installation

```js
npm install discord-miscellaneous --save
```

## Information

- Economy System (Per Guild & Global).
- Level System.
- Level Up Card.
- Random Characters.
- Welcome Card.

## Example:

- **Economy System Per Guild:**

```js
const { Client } = require('discord.js');
const { EconomySystemPerGuild } = require('discord-miscellaneous');
const client = new Client({ intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.economy = new EconomySystemPerGuild('Mongoose URL');
const prefix = '!';

client.on('ready', () => console.log("¡I'm ready!"));

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const [command, ...args] = message.content.slice(config.length).trim().split(/ +/g);

  if (command == 'balance') {
    const balance = await client.economy.userBal(message.guildId, message.author.id);
    message.reply(`Wallet: **${balance.balMoney}**\nBank: **${balance.bankMoney}**`);
  }
});

client.login('Discord Bot Token');
```

- **Level System**

```js
const { Client, Collection } = require('discord.js');
const { LevelSystem } = require('discord-miscellaneous');
const client = new Client({ intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.levels = new LevelSystem('Mongoose URL');
const prefix = '!';
const cooldownxp = new Collection();

client.on('ready', () => console.log("¡I'm ready!"));

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!cooldown.has(message.guildId + message.author.id)) {
    cooldown.set(message.guildId + message.author.id, new Collection());
  }
  let timestamps = cooldown.get(message.guildId + message.author.id);
  if (timestamps.has(message.guildId + message.author.id)) {
    if (Date.now() < timestamps.get(message.guildId + message.author.id) + 30000) return;
  }
  let randomXp = Math.floor(Math.random() * 29) + 1;
  try {
    let hasUser = await client.levels.fetchUser(message.guildId, message.author.id);
    await client.levels.addXp(message.guildId, message.author.id, randomXp);
  } catch {
    return await client.levels.createUser(message.guildId, message.author.id);
  }
  timestamps.set(message.guildId + message.author.id, Date.now() + 30000);
  setTimeout(() => timestamps.delete(message.guildId + message.author.id), 30000);
  if (!message.content.startsWith(prefix)) return;
  const [command, ...args] = message.content.slice(config.length).trim().split(/ +/g);

  if (command == 'rank') {
    const info = await client.levels.fetchUser(message.guildId, message.author.id);
    message.reply(`Level: **${info.lvl}**\nXP: **${info.xp}**`);
  }
});

client.login('Discord Bot Token');
```

## Links

- [GitHub](https://github.com/YeralAndre/discord-miscellaneous)
