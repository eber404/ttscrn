import createScreenshot from "node-html-to-image";

import { Template } from "@/domain/aggregates/template";
import { Theme } from "@/domain/entities/theme";
import { Tweet } from "@/domain/entities/tweet";
import { PrintTweetService } from "@/domain/services/print-tweet/print-tweet-service";

import { PrintTweetDTOMapper } from "@/presentation/mappers/print-tweet-dto-mapper";
import { htmlTemplateFactory } from "@/presentation/templates/html/template-factory";

export class HtmlPrintTweetService implements PrintTweetService {
  public async print(
    tweet: Tweet,
    template: Template,
    theme: Theme,
  ): Promise<void> {
    const { tweet: tweetDTO, theme: themeDTO } = PrintTweetDTOMapper.map(
      tweet,
      template,
      theme,
    );

    const html = htmlTemplateFactory(tweetDTO, themeDTO);

    await createScreenshot({
      html,
      output: __dirname + "/tweet.png",
      puppeteerArgs: {
        defaultViewport: {
          width: template.size.width,
          height: template.size.height,
        },
      },
    });
  }
}
