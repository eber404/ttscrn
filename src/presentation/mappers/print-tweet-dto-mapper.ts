import { format } from "date-fns";

import { Template } from "@/domain/aggregates/template";
import { Theme } from "@/domain/entities/theme";
import { Tweet } from "@/domain/entities/tweet";

import { ThemeDTO } from "@/presentation/dtos/theme-dto";
import { TweetDTO } from "@/presentation/dtos/tweet-dto";
import { getRootFontSize } from "@/presentation/enums/root-foot-size";

interface PrintTweetDTO {
  tweet: TweetDTO;
  theme: ThemeDTO;
}

export class PrintTweetDTOMapper {
  public static map(
    tweet: Tweet,
    template: Template,
    theme: Theme,
  ): PrintTweetDTO {
    return {
      tweet: {
        text: tweet.text,
        user: tweet.author.user,
        name: tweet.author.name,
        avatar: tweet.author.avatar.value,
        createdAt: this.formatDate(tweet.createdAt.value),
        device: tweet.device,
      },
      theme: {
        colors: {
          background: theme.colors.background,
          details: theme.colors.details,
          text: theme.colors.text,
        },
        size: {
          height: template.size.height,
          width: template.size.width,
          unit: template.size.unit,
        },
        html: {
          fontSize: `${getRootFontSize(template.size.width)}px`,
        },
      },
    };
  }

  private static formatDate(data: Date): string {
    return format(data, "h:mm aa · LLL M, y");
  }
}
