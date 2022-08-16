import * as fs from "fs";

import { createCanvas } from "canvas";

import { Template } from "@/domain/entities/template";
import { Tweet } from "@/domain/entities/tweet";
import { PrintTweetService } from "@/domain/services/print-tweet/print-tweet-service";

export class CanvasPrintTweetService implements PrintTweetService {
  public async print(tweet: Tweet, template: Template): Promise<void> {
    const canvas = createCanvas(template.size.width, template.size.height);
    const ctx = canvas.getContext("2d");

    // Write "Awesome!"
    ctx.font = "30px Impact";

    // Draw line under text
    const text = ctx.measureText(tweet.text);
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + text.width, 102);
    ctx.stroke();

    const out = fs.createWriteStream(__dirname + "/test.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
  }
}
