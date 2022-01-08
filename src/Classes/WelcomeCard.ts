import { AvatarURL, BackgroundURL, ColorResolvable } from "../Types";
import Canvas, { registerFont } from "canvas";
import path from "path";
import { DsMiError } from "../Utils/DsMiError";
registerFont(path.join(__dirname, "..", "/Fonts/Whitney_Bold.ttf"), {
  family: "Arial",
});

export default class WelcomeCard {
  private options: {
    avatar?: string;
    background?: string;
    title?: string;
    subtitle?: string;
    footer?: string;
    textColor?: string;
  } = {};
  public setAvatar(url: AvatarURL) {
    if (!url) throw new DsMiError("You didn't put the card avatar!");
    this.options.avatar = url;
    return this;
  }
  public setBackground(url: BackgroundURL) {
    if (
      !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
        url
      )
    )
      throw new DsMiError("This background url is invalid!");
    this.options.background = url;
    return this;
  }
  public setTitle(title: string) {
    if (!title) throw new DsMiError("You didn't put the card title!");
    this.options.title = title;
    return this;
  }
  public setSubtitle(subtitle: string) {
    if (!subtitle) throw new DsMiError("You didn't put the card subtitle!");
    this.options.subtitle = subtitle;
    return this;
  }
  public setFooter(footer: string) {
    if (!footer) throw new DsMiError("You didn't put the card footer!");
    this.options.footer = footer;
    return this;
  }
  public setTextColor(color: ColorResolvable) {
    if (!/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(color)) return;
    this.options.textColor = color;
    return this;
  }
  public async build() {
    let canvas = Canvas.createCanvas(1024, 500);
    let ctx = canvas.getContext("2d");
    ctx.font = "90px Arial";
    ctx.fillStyle = this.options.textColor || "FFFFFF";
    let background = await Canvas.loadImage(
      this.options.background || "https://i.imgur.com/I2KLYi8.png"
    );
    ctx.drawImage(background, 0, 0, 1024, 500);
    ctx.save();
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.textAlign = "center";
    ctx.fillText(this.options.title, 522, 375);
    ctx.beginPath();
    ctx.font = "72px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "hanging";
    ctx.lineWidth = 5;
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.font = "55px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.options.subtitle, 522, 375);
    ctx.font = "45px Arial";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fillText(this.options.footer, 522, 430);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    let avatar = await Canvas.loadImage(this.options.avatar);
    ctx.drawImage(avatar, 393, 47, 238, 238);
    return canvas.toBuffer();
  }
}
