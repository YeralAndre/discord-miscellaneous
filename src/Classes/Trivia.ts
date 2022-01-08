import axios from "axios";
import { TriviaAPI } from "../Interfaces";
import {
  MessageEmbed,
  Message,
  ColorResolvable,
  MessageActionRow,
  MessageButton,
} from "discord.js";

export class Trivia {
  private data: {
    embed: {
      color: string;
      footer: string;
      buttons?: {
        first?: string;
        second?: string;
        third?: string;
        fourth?: string;
      };
    };
    emojis: {
      correct: string;
      incorrect: string;
    };
    messages: {
      correct_answer: string;
      incorrect_answer: string;
      timeout: string;
      true: string;
      false: string;
      category: string;
      difficulty: {
        easy: string;
        normal: string;
        hard: string;
      };
      questions_lang: string;
      answers_lang: string;
    };
  };
  private trivia_data: {
    question_length?: number;
    correct_answer?: number;
    answer_array?: string[];
    question_embed?: MessageEmbed;
    question_message?: Message;
    question_buttons?: MessageActionRow;
    reaction?: string;
    input_answer?: number;
  };
  private question: TriviaAPI;
  private message: Message;
  constructor(
    message: Message,
    embed?: {
      color?: string;
      footer?: string;
      buttons?: {
        first?: string;
        second?: string;
        third?: string;
        fourth?: string;
      };
    },
    emojis?: {
      correct?: string;
      incorrect?: string;
    },
    messages?: {
      correct_answer?: string;
      incorrect_answer?: string;
      timeout?: string;
      true?: string;
      false?: string;
      category?: string;
      difficulty?: {
        easy?: string;
        normal?: string;
        hard?: string;
      };
      questions_lang?: string;
      answers_lang?: string;
    }
  ) {
    this.data = {
      embed: {
        color: embed.color || null,
        footer: embed.footer || null,
        buttons: {
          first: embed.buttons.first || "A",
          second: embed.buttons.second || "B",
          third: embed.buttons.third || "C",
          fourth: embed.buttons.fourth || "D",
        },
      },
      emojis: {
        correct: emojis.correct || null,
        incorrect: emojis.incorrect || null,
      },
      messages: {
        correct_answer: messages.correct_answer || null,
        incorrect_answer: messages.incorrect_answer || null,
        timeout: messages.timeout || null,
        true: messages.true || null,
        false: messages.false || null,
        category: messages.category || null,
        difficulty: {
          easy: messages.difficulty.easy || null,
          normal: messages.difficulty.normal || null,
          hard: messages.difficulty.hard || null,
        },
        questions_lang: messages.questions_lang || null,
        answers_lang: messages.answers_lang || null,
      },
    };
    this.message = message;
    this.init();
  }
  private async init() {
    let question: TriviaAPI;
    await axios
      .get("https://opentdb.com/api.php?amount=1&encode=base64")
      .then((res) => res.data)
      .then((data) => (question = data as TriviaAPI));
    this.question = question;
    if (atob(this.question.results[0].type) == "multiple") {
      this.trivia_data.question_length = 3;
      this.trivia_data.correct_answer = Math.floor(Math.random() * 4 + 1);
      if (this.trivia_data.correct_answer == 1) {
        this.trivia_data.answer_array = [
          "A - " + atob(this.question.results[0].correct_answer),
          "B - " + atob(this.question.results[0].incorrect_answers[0]),
          "C - " + atob(this.question.results[0].incorrect_answers[1]),
          "D - " + atob(this.question.results[0].incorrect_answers[2]),
        ];
      }
      if (this.trivia_data.correct_answer == 2) {
        this.trivia_data.answer_array = [
          "A - " + atob(this.question.results[0].incorrect_answers[0]),
          "B - " + atob(this.question.results[0].correct_answer),
          "C - " + atob(this.question.results[0].incorrect_answers[1]),
          "D - " + atob(this.question.results[0].incorrect_answers[2]),
        ];
      }
      if (this.trivia_data.correct_answer == 3) {
        this.trivia_data.answer_array = [
          "A - " + atob(this.question.results[0].incorrect_answers[0]),
          "B - " + atob(this.question.results[0].incorrect_answers[1]),
          "C - " + atob(this.question.results[0].correct_answer),
          "D - " + atob(this.question.results[0].incorrect_answers[2]),
        ];
      }
      if (this.trivia_data.correct_answer == 4) {
        this.trivia_data.answer_array = [
          "A - " + atob(this.question.results[0].incorrect_answers[0]),
          "B - " + atob(this.question.results[0].incorrect_answers[1]),
          "C - " + atob(this.question.results[0].incorrect_answers[2]),
          "D - " + atob(this.question.results[0].correct_answer),
        ];
      }
      this.trivia_data.question_embed = new MessageEmbed()
        .setColor((this.data.embed.color as ColorResolvable) || "#0099ff")
        .setTitle(atob(this.question.results[0].question))
        .setDescription(this.trivia_data.answer_array.join("\n"))
        .setFooter(
          (this.data.messages.category || "Category") +
            " - " +
            atob(this.question.results[0].category) +
            ", " +
            (this.data.messages.difficulty || "Difficulty") +
            "- " +
            atob(this.question.results[0].difficulty)
        );
    }
    if (atob(this.question.results[0].type) == "boolean") {
      this.trivia_data.question_length = 1;
      if (this.question.results[0].correct_answer == "true") {
        this.trivia_data.correct_answer = 1;
      } else {
        this.trivia_data.correct_answer = 2;
      }
      this.trivia_data.answer_array = [
        "A - " + (this.data.messages.true || "True"),
        "B - " + (this.data.messages.false || "False"),
      ];
      this.trivia_data.question_embed = new MessageEmbed()
        .setColor((this.data.embed.color as ColorResolvable) || "#0099ff")
        .setTitle(atob(this.question.results[0].question))
        .setDescription(this.trivia_data.answer_array.join("\n"))
        .setFooter(
          (this.data.messages.category || "Category") +
            " - " +
            atob(this.question.results[0].category) +
            ", " +
            (this.data.messages.difficulty || "Difficulty") +
            "- " +
            atob(this.question.results[0].difficulty)
        );
    }
    this.trivia_data.question_buttons = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel(this.data.embed.buttons.first)
        .setCustomId("1"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel(this.data.embed.buttons.second)
        .setCustomId("2"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel(this.data.embed.buttons.third)
        .setCustomId("3"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel(this.data.embed.buttons.fourth)
        .setCustomId("4")
    );
    this.trivia_data.question_message = await this.message.channel.send({
      embeds: [this.trivia_data.question_embed],
      components: [this.trivia_data.question_buttons],
    });
    let collector = this.message.channel.createMessageComponentCollector({
      filter: (b) => b.user.id == this.message.author.id && b.isButton(),
      componentType: "BUTTON",
      max: 1,
      time: 30000,
    });
    collector.on("collect", async (button) => {
      button.deferUpdate();
      switch (button.customId) {
        case "1":
          this.trivia_data.input_answer = 1;
          if (
            this.trivia_data.input_answer == this.trivia_data.correct_answer
          ) {
            this.trivia_data.answer_array[this.trivia_data.input_answer - 1] =
              this.trivia_data.answer_array[this.trivia_data.input_answer - 1] +
              " ✅";
            this.trivia_data.question_embed = new MessageEmbed()
              .setColor((this.data.embed.color as ColorResolvable) || "#0099ff")
              .setTitle(atob(this.question.results[0].question))
              .setDescription(this.trivia_data.answer_array.join("\n"))
              .setFooter(
                (this.data.messages.category || "Category") +
                  " - " +
                  atob(this.question.results[0].category) +
                  ", " +
                  (this.data.messages.difficulty || "Difficulty") +
                  "- " +
                  atob(this.question.results[0].difficulty)
              );
            this.trivia_data.question_message.edit({
              content: this.data.messages.correct_answer,
              embeds: [this.trivia_data.question_embed],
            });
          } else {
            this.trivia_data.answer_array[this.trivia_data.input_answer - 1] =
              this.trivia_data.answer_array[this.trivia_data.input_answer - 1] +
              " ❌";
            this.trivia_data.question_embed = new MessageEmbed()
              .setColor((this.data.embed.color as ColorResolvable) || "#0099ff")
              .setTitle(atob(this.question.results[0].question))
              .setDescription(this.trivia_data.answer_array.join("\n"))
              .setFooter(
                (this.data.messages.category || "Category") +
                  " - " +
                  atob(this.question.results[0].category) +
                  ", " +
                  (this.data.messages.difficulty || "Difficulty") +
                  "- " +
                  atob(this.question.results[0].difficulty)
              );
            this.trivia_data.question_message.edit({
              content: this.data.messages.incorrect_answer,
              embeds: [this.trivia_data.question_embed],
            });
          }
          break;
        case "2":
          break;
        case "3":
          break;
        case "4":
          break;
      }
    });
  }
}
