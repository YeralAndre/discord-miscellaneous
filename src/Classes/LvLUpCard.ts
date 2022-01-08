import { AvatarURL, BackgroundURL, ColorResolvable } from '../Types';
import Canvas, { registerFont } from 'canvas';
import { fillTextWithTwemoji } from 'node-canvas-with-twemoji-and-discord-emoji';
import path from 'path';
import { DsMiError } from '../Utils/DsMiError';
registerFont(path.join(__dirname, '..', '/Fonts/Whitney_Bold.ttf'), {
  family: 'Arial',
});

export default class LvLUpCard {
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
    if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url))
      throw new DsMiError('This background url is invalid!');
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
    const applyText = (canvasA: Canvas.Canvas, text: string) => {
      const ctxA = canvasA.getContext('2d');
      let fontSize = 50;
      do {
        ctxA.font = `${(fontSize -= 10)}px Arial`;
      } while (ctxA.measureText(text).width > canvasA.width - 300);
      return ctxA.font;
    };
    const canvas = Canvas.createCanvas(700, 300);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage(this.options.background);
    ctx.fillStyle = this.options.textColor || '#FFFFFF';
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.save();
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = '#000000';
    ctx.fillStyle = this.options.textColor || '#FFFFFF';
    ctx.arc(125, 140, 109, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.font = applyText(canvas, this.options.title);
    await fillTextWithTwemoji(ctx, this.options.title, 450, 125);
    ctx.fillText(this.options.subtitle, 450, 175);
    ctx.fillText(this.options.footer, 450, 225);
    ctx.restore();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(125, 140, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(this.options.avatar);
    ctx.drawImage(avatar, 25, 40, 200, 200);
    return canvas.toBuffer();
  }
}
