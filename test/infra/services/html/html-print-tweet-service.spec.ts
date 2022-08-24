import { HtmlPrintTweetService } from "@/infra/services/html/html-print-tweet-service";

import { Tweet } from "@/domain/entities/tweet";
import { Templates } from "@/domain/enums/templates";
import { Themes } from "@/domain/enums/theme";

import { tweetPropsFactory } from "@test/mocks/tweet/tweet-props-mock";

describe(HtmlPrintTweetService.name, () => {
  it("should draw something", async () => {
    // given
    const service = new HtmlPrintTweetService();
    const tweetProps = tweetPropsFactory();
    const tweet = Tweet.new(tweetProps);
    const template = Templates.instagram_stories;
    const theme = Themes.dark;

    // when
    await service.print(tweet, template, theme);

    // then
    expect(true).toBeTruthy();
  });
});
