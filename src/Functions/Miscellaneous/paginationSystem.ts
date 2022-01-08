import {
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { SendType } from "../../Types";
import { DsMiError } from "../../Utils/DsMiError";

export async function paginationSystem(
  message: Message,
  embeds: MessageEmbed[],
  buttons: MessageButton[],
  endTimeout: number | 120000,
  type: SendType,
  messages?: {
    pages?: string | "Page";
  }
) {
  if (!message) throw new DsMiError("You have not specified Message param");
  if (!embeds) throw new DsMiError("You have not specified pages");
  if (!buttons) throw new DsMiError("You have not specified array buttons");
  if (buttons[0].style == "LINK" || buttons[1].style == "LINK")
    throw new DsMiError("Links buttons are not supported!");
  if (buttons.length <= 0)
    throw new DsMiError("You need to specify at least 2 buttons");
  let page = 0;
  let row = new MessageActionRow().addComponents(buttons);
  let msg: Message;
  switch (type) {
    case "REPLY":
      msg = await message.reply({
        embeds: [
          embeds[page].setFooter(
            `${messages.pages} ${page + 1} / ${embeds.length}`
          ),
        ],
        components: [row],
      });
      break;
    case "SEND":
      msg = await message.channel.send({
        embeds: [
          embeds[page].setFooter(
            `${messages.pages} ${page + 1} / ${embeds.length}`
          ),
        ],
        components: [row],
      });
      break;
  }
  let collector = await msg.createMessageComponentCollector({
    filter: (b) =>
      (b.customId == buttons[0].customId ||
        b.customId == buttons[1].customId) &&
      b.user.id == message.author.id,
    componentType: "BUTTON",
    time: endTimeout,
  });
  collector.on("collect", async (button) => {
    switch (button.customId) {
      case buttons[0].customId:
        page = page > 0 ? --page : embeds.length - 1;
        break;
      case buttons[1].customId:
        page = page + 1 < embeds.length ? ++page : 0;
      default:
        break;
    }
    await button.deferUpdate();
    await msg.edit({
      embeds: [
        embeds[page].setFooter(
          `${messages.pages} ${page + 1} / ${embeds.length}`
        ),
      ],
      components: [row],
    });
    collector.resetTimer();
  });
  collector.on("end", () => {
    if (!msg.deleted) {
      let disRow = new MessageActionRow().addComponents(
        buttons[0].setDisabled(true),
        buttons[1].setDisabled(true)
      );
      msg.edit({
        embeds: [
          embeds[page].setFooter(
            `${messages.pages} ${page + 1} / ${embeds.length}`
          ),
        ],
        components: [disRow],
      });
    }
  });
  return msg;
}
